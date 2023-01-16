import { useEffect, useState } from 'react';
import { Group, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { frameDimensions } from '../../data/frameData';
import { CanvasItem } from '../types';

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
}

const CanvasItem = ({ item, pixelsInCm, bg }: Props) => {
  const { canvas, setCanvas } = useCanvas();
  const { allFrames } = useSidebar();
  const [position, setPosition] = useState(item.position);

  const dimension =
    frameDimensions[item.frame.size as keyof typeof frameDimensions];
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
    console.log(position);
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

  const frameBorder = () => {
    switch (dimension) {
      case frameDimensions.xs || frameDimensions.sm:
        return 8;
      case frameDimensions.md:
        return 9;
      default:
        return 10;
    }
  };

  const passepartout = () => {
    switch (dimension) {
      case frameDimensions.xs:
        return 12 + frameBorder();
      case frameDimensions.sm:
        return 16 + frameBorder();
      case frameDimensions.md:
        return 21 + frameBorder();
      case frameDimensions.lg:
        return 26 + frameBorder();
      default:
        return 33 + frameBorder();
    }
  };

  const scaledSizes = {
    width: dimension.width * pixelsInCm,
    height: dimension.height * pixelsInCm,
  };
  return (
    <Group
      x={position.x}
      y={position.y}
      draggable
      onDragEnd={(e) => {
        setPosition({ x: e.target.x(), y: e.target.y() });
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
        x={frameBorder()}
        y={frameBorder()}
        height={scaledSizes.height - frameBorder() * 2}
        width={scaledSizes.width - frameBorder() * 2}
      />
      {item.withPassepartout && (
        <>
          {/*  passepartout. Sequence: left, right, top, bottom*/}
          <Group>
            <Rect
              x={frameBorder()}
              y={frameBorder()}
              width={passepartout() - frameBorder()}
              height={scaledSizes.height - frameBorder() * 2}
              fill="#f8f8f8"
            />
            <Rect
              x={scaledSizes.width - passepartout()}
              y={frameBorder()}
              width={passepartout() - frameBorder()}
              height={scaledSizes.height - frameBorder() * 2}
              fill="#f8f8f8"
            />
            <Rect
              x={frameBorder()}
              y={frameBorder()}
              width={scaledSizes.width - frameBorder() * 2}
              height={passepartout() * 1.1 - frameBorder()}
              fill="#f8f8f8"
            />
            <Rect
              x={frameBorder()}
              y={scaledSizes.height - passepartout() * 1.1}
              width={scaledSizes.width - frameBorder() * 2}
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
              height={scaledSizes.height - passepartout() * 1.1 * 2 - 1}
              fill="#eee"
              shadowBlur={0.25}
              shadowColor="#000"
              shadowOpacity={0.6}
              shadowOffset={{ x: 0, y: 0 }}
            />
            <Rect
              x={scaledSizes.width - passepartout()}
              y={passepartout() * 1.1 + 1}
              width={1}
              height={scaledSizes.height - passepartout() * 1.1 * 2 - 1}
              fill="#eee"
              shadowBlur={0.25}
              shadowColor="#000"
              shadowOpacity={0.6}
              shadowOffset={{ x: 0, y: 0 }}
            />
            <Rect
              x={passepartout()}
              y={passepartout() * 1.1}
              width={scaledSizes.width - passepartout() * 2 + 1}
              height={1}
              fill="#ddd"
              shadowBlur={0.5}
              shadowColor="#000"
              shadowOpacity={0.2}
              shadowOffset={{ x: 0, y: 0 }}
            />
            <Rect
              x={passepartout()}
              y={scaledSizes.height - passepartout() * 1.1}
              width={scaledSizes.width - passepartout() * 2 + 1}
              height={1}
              fill="#fff"
            />
          </Group>
        </>
      )}
      {/* shadow for frame. Sequence: left, right, top, bottom*/}
      <Group>
        <Rect
          x={frameBorder()}
          y={frameBorder() + 1}
          width={1}
          height={scaledSizes.height - frameBorder() * 2 - 1}
          fill="#eee"
          shadowBlur={3}
          shadowColor="#ddd"
          shadowOpacity={0.7}
          shadowOffset={{ x: 2, y: 0 }}
        />
        <Rect
          x={scaledSizes.width - frameBorder()}
          y={frameBorder() + 1}
          width={1}
          height={scaledSizes.height - frameBorder() * 2 - 1}
          fill="#eee"
          shadowBlur={3}
          shadowColor="#ddd"
          shadowOpacity={0.7}
          shadowOffset={{ x: -2, y: 0 }}
        />
        <Rect
          x={frameBorder()}
          y={frameBorder()}
          width={scaledSizes.width - frameBorder() * 2 + 1}
          height={1}
          fill="#ddd"
          shadowBlur={13}
          shadowColor="#000"
          shadowOpacity={1}
          shadowOffset={{ x: 0, y: 6 }}
        />
        <Rect
          x={frameBorder()}
          y={scaledSizes.height - frameBorder()}
          width={scaledSizes.width - frameBorder() * 2 + 1}
          height={1}
          fill="#fff"
          opacity={0.5}
        />
      </Group>
    </Group>
  );
};

export default CanvasItem;
