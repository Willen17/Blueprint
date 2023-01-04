import { Container } from '@mui/material';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
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
  }, [stageCanvasRef]);

  const [canvasBackground] = useImage(background);

  // let x:  number, y:number, width: number, height: number, scaleX:number, scaleY:number;
  let x = 0,
    y = 0,
    width = 0,
    height = 0,
    scaleX = 0,
    scaleY = 0;
  if (canvasBackground) {
    const aspectRatio = canvasBackground.width / canvasBackground.height;

    scaleX = dimensions.width / canvasBackground.width;
    scaleY = dimensions.height / canvasBackground.height;
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

  const [selectedId, selectShape] = useState<number | null>(null);
  // const shapeRef = useRef<Konva.Rect>(null);
  // const trRef = useRef<Konva.Transformer>(null);
  // const [rectangles, setRectangles] = useState(initialRec);
  // const [selected, setSelected] = useState(false);

  // useEffect(() => {
  //   if (selected && trRef.current && shapeRef.current) {
  //     trRef.current.nodes([shapeRef.current]);
  //     trRef.current.getLayer().batchDraw();
  //     trRef.current.centeredScaling(true);
  //     // trRef.current.enabledAnchors([
  //     //   'top-left',
  //     //   'top-right',
  //     //   'bottom-left',
  //     //   'bottom-right',
  //     // ]);
  //     trRef.current.flipEnabled(false);
  //   }
  // }, [selected]);

  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() ||
      e.target.attrs.alt === 'Canvas background';
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Container sx={{ height: '100%' }} ref={stageCanvasRef}>
      <Stage
        height={dimensions.height}
        width={dimensions.width}
        onMouseDown={checkDeselect}
      >
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
          {canvas.items.map((item, index) =>
            item.frame.id.length > 0 && item.poster.id.length > 0 ? (
              <CanvasFrame
                key={index}
                item={item}
                index={index}
                imageScale={{ scaleX, scaleY }}
                bg={{ width, height, x, y }}
                selectShape={selectShape}
                isSelected={index === selectedId}
              />
            ) : null
          )}
        </Layer>
        <Layer>
          {/* <>
            <Rect
              draggable
              ref={shapeRef}
              x={rectangles.x}
              y={rectangles.y}
              width={rectangles.width}
              height={rectangles.height}
              fill={rectangles.fill}
              onClick={() => setSelected(true)}
              onTap={() => setSelected(true)}
              onDragEnd={(e) => {
                setRectangles({
                  ...rectangles,
                  x: e.target.x(),
                  y: e.target.y(),
                });
              }}
              onTransformEnd={(e) => {
                // transformer is changing scale of the node
                // and NOT its width or height
                // but in the store we have only width and height
                // to match the data better we will reset scale on transform end
                const node = shapeRef.current;
                if (node) {
                  let maxW = 200;

                  let scaleX = node.scaleX();
                  let scaleY = node.scaleY();
                  const width = node.width() * scaleX;
                  const height = node.width() * scaleY;
                  if (width > maxW) {
                    scaleX = maxW / node.width();
                  }
                  if (height > maxW) {
                    scaleY = maxW / node.height();
                  }
                  // we will reset it back
                  node.scaleX(1);
                  node.scaleY(1);
                  setRectangles({
                    ...rectangles,
                    x: node.x(),
                    y: node.y(),
                    // set minimal value
                    width: Math.max(5, node.width() * scaleX),
                    height: Math.max(5, node.height() * scaleY),
                  });
                }
              }}
            />

            <Transformer
              ref={trRef}
              rotateEnabled={false}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            /> */}
          {/* </> */}
        </Layer>
      </Stage>
    </Container>
  );
}

export default Test;
