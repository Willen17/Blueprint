import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Group, Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';

const Test2 = () => {
  const { canvas, getBackground } = useCanvas();
  const stageCanvasRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ height: 100, width: 100 });
  const [canvasBackground] = useImage(getBackground());
  const [poster] = useImage(canvas.items[0].poster.image);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const style = window.getComputedStyle(element);
        const paddingLeft = parseInt(style.paddingLeft || '0', 10);
        const paddingRight = parseInt(style.paddingRight || '0', 10);
        const rect = element.getBoundingClientRect();
        const height = Math.floor(rect.height);
        const width = Math.floor(rect.width - paddingLeft - paddingRight);
        setDimensions({ height, width });
      }
    });

    if (stageCanvasRef.current) {
      observer.observe(stageCanvasRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [stageCanvasRef]);

  let aspectRatio = 1,
    scaleX = 1,
    scaleY = 1,
    scale = 1,
    x = 1,
    y = 1;

  if (canvasBackground) {
    aspectRatio = canvasBackground!.width / canvasBackground!.height;
    scaleX = dimensions.width / canvasBackground!.width;
    scaleY = dimensions.height / canvasBackground!.height;
    scale =
      aspectRatio < 1 ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);

    x = (dimensions.width - canvasBackground!.width * scale) / 2;
    y = (dimensions.height - canvasBackground!.height * scale) / 2;
  }

  const [position, setPosition] = useState({ x: 0, y: 0 });

  // this value will be used to calculate how much 1 pixel is in cm
  const pixelsinCm = 3.5;
  return (
    <Container sx={{ height: '100%' }} ref={stageCanvasRef}>
      <Stage height={dimensions.height} width={dimensions.width}>
        <Layer>
          {canvasBackground && (
            <Group scaleX={scale} scaleY={scale} x={x} y={y}>
              <Image
                height={canvasBackground?.height}
                width={canvasBackground?.width}
                alt="background"
                image={canvasBackground}
              />
              {poster && (
                <Image
                  alt="poster"
                  x={position.x}
                  y={position.y}
                  draggable
                  onDragEnd={(e) => {
                    setPosition({ x: e.target.x(), y: e.target.y() });
                  }}
                  height={100 * pixelsinCm}
                  width={70 * pixelsinCm}
                  image={poster}
                />
              )}
            </Group>
          )}
        </Layer>
      </Stage>
    </Container>
  );
};

export default Test2;