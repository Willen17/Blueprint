import Konva from 'konva';
import { useRef, useState } from 'react';
import { Group, Image, Text } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { frameDimensions } from '../../data/frameData';
import { theme } from '../theme';
import { CanvasFrameSet } from '../types';

interface Props {
  frameSet: CanvasFrameSet;
  imageScale: {
    scaleX?: number;
    scaleY?: number;
  };
  bg: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  };
}

const CanvasFrame = (props: Props) => {
  const { withPassepartout, frameSet } = useCanvas();
  const { allFrames } = useSidebar();
  const dimension =
    frameDimensions[props.frameSet.size as keyof typeof frameDimensions];
  const match = allFrames.filter((frame) => frame.id === props.frameSet.id);

  const groupRef = useRef<Konva.Group>(null);
  const [elementPos, setElementPos] = useState({ x: 20, y: 50 });

  const [img1] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Ffour%20coca%20cola%20bottles.jpg?alt=media&token=7e1d8a77-358c-4a19-9742-1e91e09de6e2'
  );

  // This is the value we should change to make the posters size be proportionate to the background Image.
  // see our sketch in Figma.
  const multiplyValue = 20;

  let imageAspectRatio,
    scaleFactor: number | undefined,
    imageWidth: number | undefined,
    imageHeight: number | undefined;
  if (img1 && props.imageScale.scaleX && props.imageScale.scaleY) {
    imageAspectRatio =
      ((dimension.width * multiplyValue) / dimension.height) * multiplyValue;

    if (imageAspectRatio < 1) {
      scaleFactor = Math.max(props.imageScale.scaleX, props.imageScale.scaleY);
    } else {
      scaleFactor = Math.min(props.imageScale.scaleX, props.imageScale.scaleY);
    }
    // scaleFactor = Math.min(props.imageScale.scaleX, props.imageScale.scaleY);
    imageWidth = dimension.width * multiplyValue * scaleFactor;
    imageHeight = dimension.height * multiplyValue * scaleFactor;
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

  return (
    <Group
      x={elementPos.x}
      y={elementPos.y}
      dragBoundFunc={handleDrag}
      draggable
      onDragEnd={handleDragEnd}
      ref={groupRef}
    >
      <>
        <Image
          image={img1}
          alt="cola"
          width={imageWidth}
          height={imageHeight}
        />
        <Text
          text={dimension.width + 'x' + dimension.height}
          x={imageWidth && imageWidth / 2 - 7.5}
          y={imageHeight && imageHeight + 10}
          fontFamily={theme.typography.fontFamily}
          fontSize={Number(theme.typography.body1.fontSize)}
        />
      </>
    </Group>
  );
};

export default CanvasFrame;
