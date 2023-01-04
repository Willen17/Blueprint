import Konva from 'konva';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Group, Image, Rect, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import { useSidebar } from '../../context/SidebarContext';
import { frameDimensions } from '../../data/frameData';
import { theme } from '../theme';
import { CanvasItem } from '../types';

interface Props {
  item: CanvasItem;
  index: number;
  imageScale: {
    scaleX: number;
    scaleY: number;
  };
  bg: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  };
  selectShape: Dispatch<SetStateAction<number | null>>;
  isSelected: boolean;
}

// TODO: what is missing here is the frame scaling and previous position
// but for previous position i guess we are only able to do it once we have the canvas object
// saved in the db, as in that case the canvas wont be empty after reloading... or?

const CanvasFrame = (props: Props) => {
  const { allFrames } = useSidebar();
  const dimension =
    frameDimensions[props.item.frame.size as keyof typeof frameDimensions];
  const match = allFrames.filter((frame) => frame.id === props.item.frame.id);

  const [elementPos, setElementPos] = useState({ x: 20, y: 50 });

  const [poster] = useImage(props.item.poster.image);
  const [maple] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/frames%2Fmaple-surface.jpg?alt=media&token=4d386205-d4fa-4531-b801-543d95101a98'
  );
  const [walnut] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/frames%2Fwalnut-surface.jpeg?alt=media&token=e0224afc-7b60-414e-8922-63804d3f7f4c'
  );

  const frameBorder = () => {
    let frameBorder;
    dimension === frameDimensions.xs
      ? (frameBorder = 8)
      : dimension === frameDimensions.sm
      ? (frameBorder = 8)
      : dimension === frameDimensions.md
      ? (frameBorder = 9)
      : dimension === frameDimensions.lg
      ? (frameBorder = 10)
      : (frameBorder = 10);
    return (
      frameBorder *
      5 *
      Math.min(props.imageScale.scaleX, props.imageScale.scaleY)
    );
  };
  const passepartout = () => {
    let passepartout = 0;
    dimension === frameDimensions.xs
      ? (passepartout = 12)
      : dimension === frameDimensions.sm
      ? (passepartout = 16)
      : dimension === frameDimensions.md
      ? (passepartout = 21)
      : dimension === frameDimensions.lg
      ? (passepartout = 26)
      : (passepartout = 33);
    return (
      passepartout *
        5 *
        Math.min(props.imageScale.scaleX, props.imageScale.scaleY) +
      frameBorder()
    );
  };
  const frameColor = () => {
    if (match[0].category.includes('Wooden')) {
      if (match[0].title.toLowerCase().includes('maple')) return maple;
      if (match[0].title.toLowerCase().includes('walnut')) return walnut;
    } else {
      if (match[0].title.toLowerCase().includes('white')) return '#fff';
      if (match[0].title.toLowerCase().includes('black')) return '#000';
    }
  };

  // This is the value we should change to make the posters size be proportionate to the background Image.
  // see our sketch in Figma.
  const multiplyValue = 20;

  let imageAspectRatio,
    scaleFactor: number | undefined,
    imageWidth = 1,
    imageHeight = 1;
  if (poster && props.imageScale.scaleX && props.imageScale.scaleY) {
    imageAspectRatio =
      ((dimension.width * multiplyValue) / dimension.height) * multiplyValue;

    if (imageAspectRatio < 1) {
      scaleFactor = Math.max(props.imageScale.scaleX, props.imageScale.scaleY);
    } else {
      scaleFactor = Math.min(props.imageScale.scaleX, props.imageScale.scaleY);
    }
    if (props.item.poster.isPortrait) {
      imageWidth = dimension.width * multiplyValue * scaleFactor;
      imageHeight = dimension.height * multiplyValue * scaleFactor;
    } else {
      imageWidth = dimension.height * multiplyValue * scaleFactor;
      imageHeight = dimension.width * multiplyValue * scaleFactor;
    }
  }

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setElementPos({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const { width, height, x, y } = props.bg;
  const handleDrag = (pos: Konva.Vector2d) => {
    const newX = Math.max(x!, Math.min(pos.x, x! + width - imageWidth!));
    const newY = Math.max(y!, Math.min(pos.y, y! + height - imageHeight!));
    return {
      x: newX,
      y: newY,
    };
  };
  const groupRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (props.isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer()!.batchDraw();
      trRef.current.centeredScaling(true);
      // trRef.current.enabledAnchors([
      //   'top-left',
      //   'top-right',
      //   'bottom-left',
      //   'bottom-right',
      // ]);
      trRef.current.flipEnabled(false);
    }
  }, [props.isSelected]);

  return (
    <>
      <Group
        x={elementPos.x}
        y={elementPos.y}
        dragBoundFunc={handleDrag}
        draggable
        onDragEnd={handleDragEnd}
        ref={groupRef}
        onClick={() => props.selectShape(props.index)}
      >
        <>
          {match[0].category.includes('Wooden') ? (
            <Image
              image={frameColor() as HTMLImageElement}
              alt={match[0].title}
              width={imageWidth}
              height={imageHeight}
              shadowBlur={15}
              shadowColor="#000"
              shadowOpacity={0.5}
              shadowOffset={{ x: 0, y: 5 }}
            />
          ) : (
            <Rect
              width={imageWidth}
              height={imageHeight}
              fill={frameColor() as string}
              shadowBlur={15}
              shadowColor="#000"
              shadowOpacity={0.5}
              shadowOffset={{ x: 0, y: 5 }}
            />
          )}
          <Image
            image={poster}
            alt="cola"
            x={frameBorder()}
            y={frameBorder()}
            width={imageWidth - frameBorder() * 2}
            height={imageHeight - frameBorder() * 2}
          />
          {props.item.withPassepartout ? (
            <>
              {/*  passepartout. Sequence: left, right, top, bottom*/}
              <Group>
                <Rect
                  x={frameBorder()}
                  y={frameBorder()}
                  width={passepartout() - frameBorder()}
                  height={imageHeight - frameBorder() * 2}
                  fill="#f8f8f8"
                />
                <Rect
                  x={imageWidth - passepartout()}
                  y={frameBorder()}
                  width={passepartout() - frameBorder()}
                  height={imageHeight - frameBorder() * 2}
                  fill="#f8f8f8"
                />
                <Rect
                  x={frameBorder()}
                  y={frameBorder()}
                  width={imageWidth - frameBorder() * 2}
                  height={passepartout() * 1.1 - frameBorder()}
                  fill="#f8f8f8"
                />
                <Rect
                  x={frameBorder()}
                  y={imageHeight - passepartout() * 1.1}
                  width={imageWidth - frameBorder() * 2}
                  height={passepartout() * 1.1 - frameBorder()}
                  fill="#f8f8f8"
                />
              </Group>
              {/* shadow for passepartout. Sequence: left, right, top, bottom*/}
              <Group>
                <Rect
                  x={passepartout()}
                  y={passepartout() * 1.1 + 1}
                  width={1}
                  height={imageHeight - passepartout() * 1.1 * 2 - 1}
                  fill="#eee"
                  shadowBlur={0.25}
                  shadowColor="#000"
                  shadowOpacity={0.6}
                  shadowOffset={{ x: 0, y: 0 }}
                />
                <Rect
                  x={imageWidth - passepartout()}
                  y={passepartout() * 1.1 + 1}
                  width={1}
                  height={imageHeight - passepartout() * 1.1 * 2 - 1}
                  fill="#eee"
                  shadowBlur={0.25}
                  shadowColor="#000"
                  shadowOpacity={0.6}
                  shadowOffset={{ x: 0, y: 0 }}
                />
                <Rect
                  x={passepartout()}
                  y={passepartout() * 1.1}
                  width={imageWidth - passepartout() * 2 + 1}
                  height={1}
                  fill="#ddd"
                  shadowBlur={0.5}
                  shadowColor="#000"
                  shadowOpacity={0.2}
                  shadowOffset={{ x: 0, y: 0 }}
                />
                <Rect
                  x={passepartout()}
                  y={imageHeight - passepartout() * 1.1}
                  width={imageWidth - passepartout() * 2 + 1}
                  height={1}
                  fill="#fff"
                />
              </Group>
            </>
          ) : null}
          {/* shadow for frame. Sequence: left, right, top, bottom*/}
          <Group>
            <Rect
              x={frameBorder()}
              y={frameBorder() + 1}
              width={1}
              height={imageHeight - frameBorder() * 2 - 1}
              fill="#eee"
              shadowBlur={3}
              shadowColor="#ddd"
              shadowOpacity={0.7}
              shadowOffset={{ x: 2, y: 0 }}
            />
            <Rect
              x={imageWidth - frameBorder()}
              y={frameBorder() + 1}
              width={1}
              height={imageHeight - frameBorder() * 2 - 1}
              fill="#eee"
              shadowBlur={3}
              shadowColor="#ddd"
              shadowOpacity={0.7}
              shadowOffset={{ x: -2, y: 0 }}
            />
            <Rect
              x={frameBorder()}
              y={frameBorder()}
              width={imageWidth - frameBorder() * 2 + 1}
              height={1}
              fill="#ddd"
              shadowBlur={13}
              shadowColor="#000"
              shadowOpacity={1}
              shadowOffset={{ x: 0, y: 6 }}
            />
            <Rect
              x={frameBorder()}
              y={imageHeight - frameBorder()}
              width={imageWidth - frameBorder() * 2 + 1}
              height={1}
              fill="#fff"
              opacity={0.5}
            />
          </Group>
          <Text
            text={
              dimension.width +
              'x' +
              dimension.height +
              `${props.isSelected ? 'selected' : 'not selected'}`
            }
            x={imageWidth / 2 - 20}
            y={imageHeight + 10}
            fontFamily={theme.typography.fontFamily}
            fontSize={Number(theme.typography.body1.fontSize)}
          />
        </>
      </Group>
      {props.isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          resizeEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default CanvasFrame;
