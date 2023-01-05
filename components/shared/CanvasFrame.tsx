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
interface TransformEvent extends Event {
  scaleX: number;
  scaleY: number;
  clientX: number;
  clientY: number;
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

  const imageRef = useRef<Konva.Image>(null);
  const transformRef = useRef<Konva.Transformer>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 50,
    height: 70,
  });

  useEffect(() => {
    if (transformRef.current && imageRef.current) {
      transformRef.current.nodes([imageRef.current]);
      transformRef.current.getLayer()!.batchDraw();
      transformRef.current.centeredScaling(true);
      transformRef.current.enabledAnchors([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ]);
      transformRef.current.flipEnabled(false);
    }
  }, []);

  const [imagePos, setImagePos] = useState({ x: 50, y: 50 });

  const allFrameSizes = [
    { width: 21, height: 30 },
    { width: 30, height: 40 },
    { width: 40, height: 50 },
    { width: 50, height: 70 },
    { width: 70, height: 100 },
  ];

  const handleTransformEnd = () => {
    const node = imageRef.current;
    if (!node) return;
    const bbox = node.getClientRect();

    const closestSize = allFrameSizes.reduce((prev, curr) => {
      return Math.abs(curr.width - bbox.width) <
        Math.abs(prev.width - bbox.width)
        ? curr
        : prev;
    });

    node.width(closestSize.width);
    node.height(closestSize.height);
    node.getLayer()!.batchDraw();
  };

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
      <Image
        image={poster}
        alt="cola"
        width={50}
        height={70}
        ref={imageRef}
        draggable
        onDragEnd={(e) => {
          setImagePos({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      <Transformer
        ref={transformRef}
        rotateEnabled={false}
        onMouseUp={() => {
          const node = imageRef.current;
          if (!node) return;
          const bbox = node.getClientRect();
          const closestSize = allFrameSizes.reduce((prev, curr) => {
            return Math.abs(curr.width - bbox.width) <
              Math.abs(prev.width - bbox.width)
              ? curr
              : prev;
          });
          setSize(closestSize);
        }}
        boundBoxFunc={(oldBox, newBox) => {
          // get the current size of the image
          const node = imageRef.current;
          if (!node) {
            return oldBox;
          }
          const bbox = node.getClientRect();
          const rotation = node.rotation();

          // find the next fixed size based on the distance the user dragged the anchor
          let nextSize = null;
          if (newBox.width - bbox.width > 20) {
            // find the next larger fixed size
            nextSize = allFrameSizes.find((size) => size.width > bbox.width);
          } else if (bbox.width - newBox.width > 20) {
            // find the next smaller fixed size
            nextSize = allFrameSizes
              .reverse()
              .find((size) => size.width < bbox.width);
          }

          // return the bounding box with the next fixed size, if found
          if (nextSize) {
            setSize({
              width: nextSize.width,
              height: nextSize.height,
            });
            return {
              x: bbox.x,
              y: bbox.y,
              width: nextSize.width,
              height: nextSize.height,
              rotation: rotation, // add the rotation property
            };
          }

          // otherwise, return the original bounding box
          return oldBox;
        }}
      />
      {size && (
        <Text
          x={imagePos.x + size.width / 2}
          y={imagePos.y + size.height * 2}
          fontFamily={theme.typography.fontFamily}
          fontSize={Number(theme.typography.body1.fontSize)}
          text={`${size.width}x${size.height}`}
        />
      )}
      {props.isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          resizeEnabled={false}
          onTransformEnd={handleTransformEnd}
        />
      )}
    </>
  );
};

export default CanvasFrame;
