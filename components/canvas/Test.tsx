import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import CanvasFrame from '../shared/CanvasFrame';

// this component is just for testing - many values to be changed later
function Test() {
  const { background, frameSet } = useCanvas();

  const stageCanvasRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ height: 100, width: 100 });

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

  const [canvasBackground] = useImage(background);

  let x, y, width, height;
  if (canvasBackground) {
    const aspectRatio = canvasBackground.width / canvasBackground.height;

    const scaleX = dimensions.width / canvasBackground.width;
    const scaleY = dimensions.height / canvasBackground.height;
    let scale = scaleX;
    if (aspectRatio < 1) {
      scale = Math.max(scaleX, scaleY);
    } else {
      scale = Math.min(scaleX, scaleY);
    }
    width = canvasBackground.width * scale;
    height = canvasBackground.height * scale;

    x = (dimensions.width - width) / 2;
    y = (dimensions.height - height) / 2;
  }

  return (
    <Container sx={{ height: '100%' }} ref={stageCanvasRef}>
      <Stage height={dimensions.height} width={dimensions.width}>
        <Layer>
          {canvasBackground && (
            <Image
              image={canvasBackground}
              alt="Canvas background"
              x={x}
              y={y}
              width={width}
              height={height}
            />
          )}
        </Layer>
        {frameSet.id && frameSet.size ? (
          <CanvasFrame frameSet={frameSet} />
        ) : null}
      </Stage>
    </Container>
  );
}

export default Test;
