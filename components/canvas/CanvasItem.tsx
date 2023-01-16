import { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasItem } from '../types';

interface Props {
  item: CanvasItem;
  pixelsInCm: number;
}

const CanvasItem = ({ item, pixelsInCm }: Props) => {
  const { canvas, setCanvas } = useCanvas();
  const [position, setPosition] = useState({
    x: item.position.x,
    y: item.position.y,
  });
  const [poster] = useImage(item.poster.image);

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
      height={100 * pixelsInCm}
      width={70 * pixelsInCm}
      image={poster}
    />
  );
};

export default CanvasItem;
