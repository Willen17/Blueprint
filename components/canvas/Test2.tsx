import { Container } from '@mui/material';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Group, Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import CanvasItem from './CanvasItem';

const Test2 = () => {
  const { canvas, getBackground } = useCanvas();
  const { endEditMode } = useSidebar();
  const stageCanvasRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ height: 100, width: 100 });
  const [canvasBackground] = useImage(getBackground()?.image || '');

  const [selectedId, selectShape] = useState<string | null>(null);

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

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.attrs.alt === 'background';
    if (clickedOnEmpty) {
      selectShape(null);
      endEditMode();
    }
  };

  return (
    <Container sx={{ height: '100%' }} ref={stageCanvasRef}>
      <Stage
        height={dimensions.height}
        width={dimensions.width}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {canvasBackground && (
            <Group scaleX={scale} scaleY={scale} x={x} y={y}>
              <Image
                height={canvasBackground.height}
                width={canvasBackground.width}
                alt="background"
                image={canvasBackground}
              />
              {canvas.items.map(
                (item) =>
                  item.frame.id.length > 0 &&
                  item.poster.id.length > 0 && (
                    <CanvasItem
                      key={item.id}
                      item={item}
                      pixelsInCm={canvas.background!.cmInPixels || 3.5}
                      bg={{
                        x,
                        y,
                        width: canvasBackground.width * scale,
                        height: canvasBackground.height * scale,
                        scale,
                      }}
                      selectShape={selectShape}
                      isSelected={item.id === selectedId}
                    />
                  )
              )}
            </Group>
          )}
        </Layer>
      </Stage>
    </Container>
  );
};

export default Test2;
