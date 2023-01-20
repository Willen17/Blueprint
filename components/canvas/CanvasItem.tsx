import Konva from 'konva';
import { isEqual } from 'lodash';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Group, Image, Rect, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { frameDimensions } from '../../data/frameData';
import { posterSizes } from '../../lib/valSchemas';
import { theme } from '../theme';
import { CanvasItem, Dimension } from '../types';

interface Props {
  item: CanvasItem;
  pixelsInCm: number;
  bg: {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
  };
  selectShape: Dispatch<SetStateAction<string | null>>;
  isSelected: boolean;
}

const CanvasItem = ({
  item,
  pixelsInCm,
  bg,
  selectShape,
  isSelected,
}: Props) => {
  const { canvas, setCanvas } = useCanvas();
  const { allFrames, handleSelectItem, isEditingFrame } = useSidebar();
  const [position, setPosition] = useState(item.position);

  const dimension =
    frameDimensions[item.frame.size as keyof typeof frameDimensions];

  const [size, setSize] = useState<Dimension>({
    width: item.poster.isPortrait ? dimension.width : dimension.height,
    height: item.poster.isPortrait ? dimension.height : dimension.width,
  });

  const [scaledSizes, setScaledSizes] = useState({
    width:
      (item.poster.isPortrait ? dimension.width : dimension.height) *
      pixelsInCm,
    height:
      (item.poster.isPortrait ? dimension.height : dimension.width) *
      pixelsInCm,
  });
  const match = allFrames.filter((frame) => frame.id === item.frame.id);

  const [poster] = useImage(item.poster.image);

  const [maple] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/frames%2Fmaple-surface.jpg?alt=media&token=4d386205-d4fa-4531-b801-543d95101a98'
  );
  const [walnut] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/frames%2Fwalnut-surface.jpeg?alt=media&token=e0224afc-7b60-414e-8922-63804d3f7f4c'
  );

  const frameColor = () => {
    if (match[0].category.includes('Wooden')) {
      if (match[0].title.toLowerCase().includes('maple')) return maple;
      if (match[0].title.toLowerCase().includes('walnut')) return walnut;
    } else {
      if (match[0].title.toLowerCase().includes('white')) return '#fff';
      if (match[0].title.toLowerCase().includes('black')) return '#000';
    }
  };
  useEffect(() => {
    if (transformRef.current && imageRef.current && isSelected) {
      transformRef.current.nodes([imageRef.current]);
      transformRef.current.getLayer()!.batchDraw();
      transformRef.current.centeredScaling(true);
      transformRef.current.enabledAnchors([]);
    }
  }, [isSelected]);

  useEffect(() => {
    setSize({
      width: item.poster.isPortrait ? dimension.width : dimension.height,
      height: item.poster.isPortrait ? dimension.height : dimension.width,
    });
  }, [dimension, item.poster.isPortrait]);

  useEffect(() => {
    let copyOfCanvasItems = canvas.items.map((currentItem) => {
      if (currentItem.id === item.id) {
        return { ...currentItem, position: { x: position.x, y: position.y } };
      }
      return currentItem;
    });
    if (canvas.items !== copyOfCanvasItems) {
      setCanvas({ ...canvas, items: copyOfCanvasItems });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const [frameBorder, setFrameBorder] = useState(() => {
    const object = item.poster.isPortrait
      ? size
      : { width: size.height, height: size.width };

    if (isEqual(object, frameDimensions.xs)) return 2 * pixelsInCm;
    if (isEqual(object, frameDimensions.sm)) return 2 * pixelsInCm;
    if (isEqual(object, frameDimensions.md)) return 2.25 * pixelsInCm;
    else return 2.5 * pixelsInCm;
  });

  useEffect(() => {
    setFrameBorder(() => {
      const object = item.poster.isPortrait
        ? size
        : { width: size.height, height: size.width };

      if (isEqual(object, frameDimensions.xs)) return 2 * pixelsInCm;
      if (isEqual(object, frameDimensions.sm)) return 2 * pixelsInCm;
      if (isEqual(object, frameDimensions.md)) return 2.25 * pixelsInCm;
      else return 2.5 * pixelsInCm;
    });
  }, [size, item.poster.isPortrait, pixelsInCm]);

  useEffect(() => {
    setPassepartout(() => {
      const object = item.poster.isPortrait
        ? size
        : { width: size.height, height: size.width };

      if (isEqual(object, frameDimensions.xs))
        return 3 * pixelsInCm + frameBorder;
      if (isEqual(object, frameDimensions.sm))
        return 4 * pixelsInCm + frameBorder;
      if (isEqual(object, frameDimensions.md))
        return 5.25 * pixelsInCm + frameBorder;
      if (isEqual(object, frameDimensions.lg))
        return 6.5 * pixelsInCm + frameBorder;
      else {
        return 8.1 * pixelsInCm + frameBorder;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameBorder, size]);

  const [passepartout, setPassepartout] = useState(() => {
    const object = item.poster.isPortrait
      ? size
      : { width: size.height, height: size.width };

    if (isEqual(object, frameDimensions.xs))
      return 3 * pixelsInCm + frameBorder;
    if (isEqual(object, frameDimensions.sm))
      return 4 * pixelsInCm + frameBorder;
    if (isEqual(object, frameDimensions.md))
      return 5.25 * pixelsInCm + frameBorder;
    if (isEqual(object, frameDimensions.lg))
      return 6.5 * pixelsInCm + frameBorder;
    else {
      return 8.1 * pixelsInCm + frameBorder;
    }
  });

  useEffect(() => {
    setScaledSizes({
      width: size.width * pixelsInCm,
      height: size.height * pixelsInCm,
    });
  }, [size, dimension, pixelsInCm]);

  const imageRef = useRef<Konva.Rect>(null);
  const transformRef = useRef<Konva.Transformer>(null);

  return (
    <>
      <Rect
        fill="transparent"
        width={scaledSizes.width}
        height={scaledSizes.height}
        ref={imageRef}
        x={position.x}
        y={position.y}
      />
      <Group
        x={position.x}
        y={position.y}
        draggable
        onDragStart={() => {
          selectShape(null);
        }}
        onDragEnd={(e) => {
          setPosition({ x: e.target.x(), y: e.target.y() });
          selectShape(item.id);
        }}
        dragBoundFunc={(pos) => {
          const { width, height, x, y, scale } = bg;
          const newX = Math.max(
            x,
            Math.min(pos.x, x + width - scaledSizes.width * scale)
          );
          const newY = Math.max(
            y,
            Math.min(pos.y, y + height - scaledSizes.height * scale)
          );
          return { x: newX, y: newY };
        }}
        onClick={() => {
          selectShape(item.id), handleSelectItem(item);
        }}
        onTap={() => {
          selectShape(item.id), handleSelectItem(item);
        }}
      >
        {match[0].category.includes('Wooden') ? (
          <Image
            image={frameColor() as HTMLImageElement}
            alt={match[0].title}
            height={scaledSizes.height}
            width={scaledSizes.width}
            shadowBlur={15}
            shadowColor="#000"
            shadowOpacity={0.5}
            shadowOffset={{ x: 0, y: 5 }}
          />
        ) : (
          <Rect
            height={scaledSizes.height}
            width={scaledSizes.width}
            fill={frameColor() as string}
            shadowBlur={15}
            shadowColor="#000"
            shadowOpacity={0.5}
            shadowOffset={{ x: 0, y: 5 }}
          />
        )}
        <Image
          alt="poster"
          image={poster}
          x={frameBorder}
          y={frameBorder}
          height={scaledSizes.height - frameBorder * 2}
          width={scaledSizes.width - frameBorder * 2}
        />
        {item.withPassepartout && (
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
        )}
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
        {isSelected && (
          <Text
            text={size.width + 'x' + size.height}
            x={scaledSizes.width / 2 - 20}
            y={scaledSizes.height + 10}
            fontFamily={theme.typography.fontFamily}
            fontSize={Number(theme.typography.body1.fontSize)}
          />
        )}
        {isSelected && posterSizes.length < 2 && (
          <Text
            text="This poster only has this size"
            x={scaledSizes.width / 2 - 70}
            y={scaledSizes.height + 20}
            fontFamily={theme.typography.fontFamily}
            fontSize={Number(theme.typography.body1.fontSize)}
          />
        )}
      </Group>
      {isSelected && posterSizes.length > 1 && (
        <Transformer
          ref={transformRef}
          rotateEnabled={false}
          keepRatio={false}
          flipEnabled={false}
        />
      )}
    </>
  );
};

export default CanvasItem;
