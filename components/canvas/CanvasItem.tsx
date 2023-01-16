import { useEffect, useState } from 'react';
import { Image } from 'react-konva';
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

  return (
    <Image
      alt="poster"
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
          Math.min(pos.x, x + width - dimension.width * pixelsInCm * scale)
        );
        const newY = Math.max(
          y,
          Math.min(pos.y, y + height - dimension.height * pixelsInCm * scale)
        );
        return { x: newX, y: newY };
      }}
      height={dimension.height * pixelsInCm}
      width={dimension.width * pixelsInCm}
      image={poster}
    />
  );
};

export default CanvasItem;
