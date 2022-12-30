import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImg, Layer, Rect, Stage, Text } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { theme } from '../theme';

// this component is just for testing - many values to be changed later
function Test() {
  const { background } = useCanvas();
  const [img1] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Ffour%20coca%20cola%20bottles.jpg?alt=media&token=7e1d8a77-358c-4a19-9742-1e91e09de6e2'
  );

  const [img2] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fmilky%20way%20with%20mountains.jpeg?alt=media&token=ead8bbfe-f1e5-423d-89ee-aab6847ebac8'
  );

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
        <Layer draggable>
          <Rect
            x={20}
            y={50}
            width={40 * 3.5}
            height={50 * 3.5}
            fill="black"
            shadowBlur={15}
            shadowColor="black"
            shadowOpacity={0.5}
            shadowOffset={{ x: 0, y: 5 }}
          />
          <Rect
            x={20 + 10}
            y={50 + 10}
            width={40 * 3.5 - 20}
            height={50 * 3.5 - 20}
            fill="#f8f8f8"
          />
          <KonvaImg
            image={img1}
            alt="cola"
            x={20 + 30}
            y={50 + 30}
            width={40 * 3.5 - 60}
            height={50 * 3.5 - 60}
            shadowBlur={1}
            shadowColor="black"
            shadowOpacity={0.6}
            shadowOffset={{ x: 0, y: 0 }}
          />
          <Text
            text="40x50"
            x={(20 + 40 * 3.5) / 2.2}
            y={50 + 50 * 3.5 + 10}
            fontFamily={theme.typography.fontFamily}
            fontSize={Number(theme.typography.body1.fontSize)}
          />
        </Layer>
        <Layer draggable>
          <Rect
            x={100}
            y={150}
            width={50 * 3.5}
            height={70 * 3.5}
            fill="white"
            shadowBlur={15}
            shadowColor="black"
            shadowOpacity={0.5}
            shadowOffset={{ x: 0, y: 5 }}
          />
          <Rect
            x={100 + 10}
            y={150 + 10}
            width={50 * 3.5 - 20}
            height={70 * 3.5 - 20}
            fill="#f8f8f8"
          />
          <KonvaImg
            image={img2}
            alt="cola"
            x={100 + 30}
            y={150 + 30}
            width={50 * 3.5 - 60}
            height={70 * 3.5 - 60}
            shadowBlur={1}
            shadowColor="black"
            shadowOpacity={0.6}
            shadowOffset={{ x: 0, y: 0 }}
          />
          <Text
            text="50x70"
            x={(100 + 50 * 3.5) / 1.62}
            y={150 + 70 * 3.5 + 10}
            fontFamily={theme.typography.fontFamily}
            fontSize={Number(theme.typography.body1.fontSize)}
          />
        </Layer>
      </Stage>
    </Container>
  );
}

export default Test;
