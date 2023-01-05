import Konva from 'konva';
import { isEqual } from 'lodash';
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

  const [frameBorder, setFrameBorder] = useState(20);
  const [passepartout, setPassepartout] = useState(20);

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
    scaleFactor = 1;
  if (poster && props.imageScale.scaleX && props.imageScale.scaleY) {
    imageAspectRatio =
      ((dimension.width * multiplyValue) / dimension.height) * multiplyValue;

    if (imageAspectRatio < 1) {
      scaleFactor = Math.max(props.imageScale.scaleX, props.imageScale.scaleY);
    } else {
      scaleFactor = Math.min(props.imageScale.scaleX, props.imageScale.scaleY);
    }
  }
  const imageRef = useRef<Konva.Rect>(null);
  const transformRef = useRef<Konva.Transformer>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: props.item.poster.isPortrait ? dimension.width : dimension.height,
    height: props.item.poster.isPortrait ? dimension.height : dimension.width,
  });

  useEffect(() => {
    if (transformRef.current && imageRef.current && props.isSelected) {
      transformRef.current.nodes([imageRef.current]);
      transformRef.current.getLayer()!.batchDraw();
      transformRef.current.centeredScaling(true);
      transformRef.current.enabledAnchors([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ]);
    }
  }, [props.isSelected]);

  const allFrameSizes = props.item.poster.isPortrait
    ? [
        {
          width: 21 * multiplyValue * scaleFactor,
          height: 30 * multiplyValue * scaleFactor,
        },
        {
          width: 30 * multiplyValue * scaleFactor,
          height: 40 * multiplyValue * scaleFactor,
        },
        {
          width: 40 * multiplyValue * scaleFactor,
          height: 50 * multiplyValue * scaleFactor,
        },
        {
          width: 50 * multiplyValue * scaleFactor,
          height: 70 * multiplyValue * scaleFactor,
        },
        {
          width: 70 * multiplyValue * scaleFactor,
          height: 100 * multiplyValue * scaleFactor,
        },
      ]
    : [
        {
          height: 21 * multiplyValue * scaleFactor,
          width: 30 * multiplyValue * scaleFactor,
        },
        {
          height: 30 * multiplyValue * scaleFactor,
          width: 40 * multiplyValue * scaleFactor,
        },
        {
          height: 40 * multiplyValue * scaleFactor,
          width: 50 * multiplyValue * scaleFactor,
        },
        {
          height: 50 * multiplyValue * scaleFactor,
          width: 70 * multiplyValue * scaleFactor,
        },
        {
          height: 70 * multiplyValue * scaleFactor,
          width: 100 * multiplyValue * scaleFactor,
        },
      ];

  const [scaledSizes, setScaledSizes] = useState({
    width: size.width * multiplyValue * scaleFactor,
    height: size.height * multiplyValue * scaleFactor,
  });

  useEffect(() => {
    setScaledSizes({
      width: size.width * multiplyValue * scaleFactor,
      height: size.height * multiplyValue * scaleFactor,
    });

    setFrameBorder(() => {
      let frameBorder;
      let currentSize = props.item.poster.isPortrait
        ? size
        : { width: size.height, height: size.width };
      isEqual(currentSize, frameDimensions.xs)
        ? (frameBorder = 8)
        : isEqual(currentSize, frameDimensions.sm)
        ? (frameBorder = 8)
        : isEqual(currentSize, frameDimensions.md)
        ? (frameBorder = 9)
        : isEqual(currentSize, frameDimensions.lg)
        ? (frameBorder = 10)
        : (frameBorder = 10);
      return frameBorder * 5 * scaleFactor;
    });
  }, [size, scaleFactor, dimension, props]);

  useEffect(() => {
    setPassepartout(() => {
      let passepartout = 0;
      let currentSize = props.item.poster.isPortrait
        ? size
        : { width: size.height, height: size.width };
      isEqual(currentSize, frameDimensions.xs)
        ? (passepartout = 12)
        : isEqual(currentSize, frameDimensions.sm)
        ? (passepartout = 16)
        : isEqual(currentSize, frameDimensions.md)
        ? (passepartout = 21)
        : isEqual(currentSize, frameDimensions.lg)
        ? (passepartout = 26)
        : (passepartout = 33);

      return passepartout * 5 * scaleFactor + frameBorder;
    });
  }, [frameBorder, scaleFactor, dimension, props, size]);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setElementPos({
      x: e.target.x(),
      y: e.target.y(),
    });
    props.selectShape(props.index);
  };

  const handleDrag = (pos: Konva.Vector2d) => {
    const { width, height, x, y } = props.bg;
    const newX = Math.max(x!, Math.min(pos.x, x! + width - scaledSizes.width!));
    const newY = Math.max(
      y!,
      Math.min(pos.y, y! + height - scaledSizes.height!)
    );
    return {
      x: newX,
      y: newY,
    };
  };
  return (
    <>
      <Rect
        fill="transparent"
        width={scaledSizes.width}
        height={scaledSizes.height}
        ref={imageRef}
        x={elementPos.x}
        y={elementPos.y}
      />
      <Group
        x={elementPos.x}
        y={elementPos.y}
        dragBoundFunc={handleDrag}
        draggable
        onDragStart={() => props.selectShape(null)}
        onDragEnd={handleDragEnd}
        onClick={() => props.selectShape(props.index)}
      >
        <>
          {match[0].category.includes('Wooden') ? (
            <Image
              image={frameColor() as HTMLImageElement}
              alt={match[0].title}
              width={scaledSizes.width}
              height={scaledSizes.height}
              shadowBlur={15}
              shadowColor="#000"
              shadowOpacity={0.5}
              shadowOffset={{ x: 0, y: 5 }}
            />
          ) : (
            <Rect
              width={scaledSizes.width}
              height={scaledSizes.height}
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
            x={frameBorder}
            y={frameBorder}
            width={scaledSizes.width - frameBorder * 2}
            height={scaledSizes.height - frameBorder * 2}
          />
          {props.item.withPassepartout ? (
            <>
              {/*  passepartout. Sequence: left, right, top, bottom*/}
              <Group>
                <Rect
                  x={frameBorder}
                  y={frameBorder}
                  width={passepartout - frameBorder}
                  height={scaledSizes.height - frameBorder * 2}
                  fill="#f8f8f8"
                />
                <Rect
                  x={scaledSizes.width - passepartout}
                  y={frameBorder}
                  width={passepartout - frameBorder}
                  height={scaledSizes.height - frameBorder * 2}
                  fill="#f8f8f8"
                />
                <Rect
                  x={frameBorder}
                  y={frameBorder}
                  width={scaledSizes.width - frameBorder * 2}
                  height={passepartout * 1.1 - frameBorder}
                  fill="#f8f8f8"
                />
                <Rect
                  x={frameBorder}
                  y={scaledSizes.height - passepartout * 1.1}
                  width={scaledSizes.width - frameBorder * 2}
                  height={passepartout * 1.1 - frameBorder}
                  fill="#f8f8f8"
                />
              </Group>
              {/* shadow for passepartout. Sequence: left, right, top, bottom*/}
              <Group>
                <Rect
                  x={passepartout}
                  y={passepartout * 1.1 + 1}
                  width={1}
                  height={scaledSizes.height - passepartout * 1.1 * 2 - 1}
                  fill="#eee"
                  shadowBlur={0.25}
                  shadowColor="#000"
                  shadowOpacity={0.6}
                  shadowOffset={{ x: 0, y: 0 }}
                />
                <Rect
                  x={scaledSizes.width - passepartout}
                  y={passepartout * 1.1 + 1}
                  width={1}
                  height={scaledSizes.height - passepartout * 1.1 * 2 - 1}
                  fill="#eee"
                  shadowBlur={0.25}
                  shadowColor="#000"
                  shadowOpacity={0.6}
                  shadowOffset={{ x: 0, y: 0 }}
                />
                <Rect
                  x={passepartout}
                  y={passepartout * 1.1}
                  width={scaledSizes.width - passepartout * 2 + 1}
                  height={1}
                  fill="#ddd"
                  shadowBlur={0.5}
                  shadowColor="#000"
                  shadowOpacity={0.2}
                  shadowOffset={{ x: 0, y: 0 }}
                />
                <Rect
                  x={passepartout}
                  y={scaledSizes.height - passepartout * 1.1}
                  width={scaledSizes.width - passepartout * 2 + 1}
                  height={1}
                  fill="#fff"
                />
              </Group>
            </>
          ) : null}
          {/* shadow for frame. Sequence: left, right, top, bottom*/}
          <Group>
            <Rect
              x={frameBorder}
              y={frameBorder + 1}
              width={1}
              height={scaledSizes.height - frameBorder * 2 - 1}
              fill="#eee"
              shadowBlur={3}
              shadowColor="#ddd"
              shadowOpacity={0.7}
              shadowOffset={{ x: 2, y: 0 }}
            />
            <Rect
              x={scaledSizes.width - frameBorder}
              y={frameBorder + 1}
              width={1}
              height={scaledSizes.height - frameBorder * 2 - 1}
              fill="#eee"
              shadowBlur={3}
              shadowColor="#ddd"
              shadowOpacity={0.7}
              shadowOffset={{ x: -2, y: 0 }}
            />
            <Rect
              x={frameBorder}
              y={frameBorder}
              width={scaledSizes.width - frameBorder * 2 + 1}
              height={1}
              fill="#ddd"
              shadowBlur={13}
              shadowColor="#000"
              shadowOpacity={1}
              shadowOffset={{ x: 0, y: 6 }}
            />
            <Rect
              x={frameBorder}
              y={scaledSizes.height - frameBorder}
              width={scaledSizes.width - frameBorder * 2 + 1}
              height={1}
              fill="#fff"
              opacity={0.5}
            />
          </Group>
          <Text
            text={size.width + 'x' + size.height}
            x={scaledSizes.width / 2 - 20}
            y={scaledSizes.height + 10}
            fontFamily={theme.typography.fontFamily}
            fontSize={Number(theme.typography.body1.fontSize)}
          />
        </>
      </Group>

      {props.isSelected && (
        <Transformer
          ref={transformRef}
          rotateEnabled={false}
          keepRatio={false}
          flipEnabled={false}
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
            setSize({
              width: Math.round(
                closestSize.width / multiplyValue / scaleFactor
              ),
              height: Math.round(
                closestSize.height / multiplyValue / scaleFactor
              ),
            });
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
            if (newBox.width - bbox.width > 20 * multiplyValue * scaleFactor) {
              // find the next larger fixed size
              nextSize = allFrameSizes.find((size) => size.width > bbox.width);
            } else if (
              bbox.width - newBox.width >
              20 * multiplyValue * scaleFactor
            ) {
              // find the next smaller fixed size
              nextSize = allFrameSizes
                .reverse()
                .find((size) => size.width < bbox.width);
            } // return the bounding box with the next fixed size, if found
            if (nextSize) {
              setSize({
                width: Math.round(nextSize.width / multiplyValue / scaleFactor),
                height: Math.round(
                  nextSize.height / multiplyValue / scaleFactor
                ),
              });
              return {
                x: bbox.x,
                y: bbox.y,
                width: scaledSizes.width,
                height: scaledSizes.height,
                rotation: rotation, // add the rotation property
              };
            }

            // otherwise, return the original bounding box
            return oldBox;
          }}
        />
      )}
    </>
  );
};

export default CanvasFrame;
