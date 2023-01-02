import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Stage } from 'react-konva';
import { useCanvas } from '../../context/CanvasContext';
import CanvasFrame from '../shared/CanvasFrame';

// this component is just for testing - many values to be changed later
function Test() {
  const { background, canvas } = useCanvas();

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
  }, []);

  return (
    <Container sx={{ height: '100%' }} ref={stageCanvasRef}>
      <Stage
        height={dimensions.height}
        width={dimensions.width}
        style={{
          backgroundImage: `url(${background})`,
          maxHeight: dimensions.height,
          maxWidth: dimensions.width,
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      >
        {canvas.items.map((item, index) =>
          item.frame.id.length > 0 && item.poster.id.length > 0 ? (
            <CanvasFrame key={index} frameSet={item.frame} index={index} />
          ) : null
        )}
      </Stage>
    </Container>
  );
}

export default Test;
