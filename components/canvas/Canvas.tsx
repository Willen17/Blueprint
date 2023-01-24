import {
  Box,
  Container,
  IconButton,
  Slider,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { IconResize } from '@tabler/icons';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Group, Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { theme } from '../theme';
import CanvasItem from './CanvasItem';

const Canvas = () => {
  const { canvas, getBackground, setBackground } = useCanvas();
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
  const XsScreen = useMediaQuery(theme.breakpoints.down(485));

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
  const [value, setValue] = useState<number>(3.5);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (
      Math.round(((newValue as number) / 14.2857143) * 10) / 10 !==
      canvas.background!.cmInPixels
    ) {
      if (canvas.background?.user) {
        setBackground({
          ...canvas.background!,
          cmInPixels: Math.round(((newValue as number) / 14.2857143) * 10) / 10,
        });
      }
    }
  };

  useEffect(() => {
    if (canvas.background) {
      if (canvas.background.cmInPixels) {
        if (canvas.background.user) {
          if (
            Math.round((value / 14.2857143) * 10) / 10 !==
            canvas.background.cmInPixels
          ) {
            setValue(Math.round(canvas.background.cmInPixels * 14.2857143));
          }
        }
      }
    }
  }, [canvas, value]);

  return (
    <Container
      sx={{ height: '100%', position: 'relative' }}
      ref={stageCanvasRef}
    >
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
      {canvas.background && canvas.background.user && (
        <Box
          sx={{
            width: XsScreen ? 195 : 295,
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            pl: XsScreen ? 2 : 3,
            pr: XsScreen ? 2 : 1,
            columnGap: 1.5,
            bgcolor: theme.palette.secondary.light,
            opacity: 0.65,
            borderRadius: 50,
          }}
        >
          <Slider
            size="small"
            onChange={handleChange}
            value={value}
            aria-label="Multiply size"
            aria-valuetext={`${value} multiply size`}
            defaultValue={30}
            color="primary"
            min={10}
            max={300}
            step={5}
          />
          <Tooltip title="Drag slider to resize frames">
            <IconButton color="primary">
              <IconResize size={24} strokeWidth={1.2} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Container>
  );
};

export default Canvas;
