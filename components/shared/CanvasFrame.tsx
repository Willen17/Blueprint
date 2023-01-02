// @ts-nocheck
import { Group, Image, Layer, Rect, Text } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { frameDimensions } from '../../data/frameData';
import { theme } from '../theme';
import { CanvasFrameSet } from '../types';

interface Props {
  frameSet: CanvasFrameSet;
  index: Key;
}

const CanvasFrame = (props: Props) => {
  const { withPassepartout } = useCanvas();
  const { allFrames } = useSidebar();
  const dimension = frameDimensions[props.frameSet.size];
  const match = allFrames.filter((frame) => frame.id === props.frameSet.id);

  const [img1] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Ffour%20coca%20cola%20bottles.jpg?alt=media&token=7e1d8a77-358c-4a19-9742-1e91e09de6e2'
  );
  const [maple] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/frames%2Fmaple-surface.jpg?alt=media&token=4d386205-d4fa-4531-b801-543d95101a98'
  );
  const [walnut] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/frames%2Fwalnut-surface.jpeg?alt=media&token=e0224afc-7b60-414e-8922-63804d3f7f4c'
  );

  const pos = () => {
    if (props.index === 0) return { x: 20, y: 30 };
    return { x: 20 * (props.index + 1), y: 30 };
  };

  const frameBorder = () => {
    let frameBorder;
    dimension === frameDimensions.xs
      ? (frameBorder = 8)
      : dimension === frameDimensions.sm
      ? (frameBorder = 8)
      : dimension === frameDimensions.md
      ? (frameBorder = 9)
      : dimension === frameDimensions.lg
      ? (frameBorder = 10)
      : (frameBorder = 10);
    return frameBorder;
  };

  const passepartout = () => {
    let passepartout = 0;
    dimension === frameDimensions.xs
      ? (passepartout = 12)
      : dimension === frameDimensions.sm
      ? (passepartout = 16)
      : dimension === frameDimensions.md
      ? (passepartout = 21)
      : dimension === frameDimensions.lg
      ? (passepartout = 26)
      : (passepartout = 33);
    return passepartout + frameBorder();
  };

  const frameColor = () => {
    if (match[0].category.includes('Wooden')) {
      if (match[0].title.toLowerCase().includes('maple')) return maple;
      if (match[0].title.toLowerCase().includes('walnut')) return walnut;
    } else {
      if (match[0].title.toLowerCase().includes('white')) return '#fff';
      if (match[0].title.toLowerCase().includes('black')) return '#000';
    }
  };

  return (
    <Layer draggable>
      <>
        {match[0].category.includes('Wooden') ? (
          <Image
            image={frameColor()}
            alt={match[0].title}
            x={pos().x}
            y={pos().y}
            width={dimension.width * 3.5}
            height={dimension.height * 3.5}
            shadowBlur={15}
            shadowColor="#000"
            shadowOpacity={0.5}
            shadowOffset={{ x: 0, y: 5 }}
          />
        ) : (
          <Rect
            x={pos().x}
            y={pos().y}
            width={dimension.width * 3.5}
            height={dimension.height * 3.5}
            fill={frameColor()}
            shadowBlur={15}
            shadowColor="#000"
            shadowOpacity={0.5}
            shadowOffset={{ x: 0, y: 5 }}
          />
        )}

        <Image
          image={img1}
          alt="cola"
          x={pos().x + frameBorder()}
          y={pos().y + frameBorder()}
          width={dimension.width * 3.5 - frameBorder() * 2}
          height={dimension.height * 3.5 - frameBorder() * 2}
        />
        {withPassepartout ? (
          <>
            {/*  passepartout. Sequence: left, right, top, bottom*/}
            <Group>
              <Rect
                x={pos().x + frameBorder()}
                y={pos().y + frameBorder()}
                width={passepartout() - frameBorder()}
                height={dimension.height * 3.5 - frameBorder() * 2}
                fill="#f8f8f8"
              />
              <Rect
                x={pos().x + dimension.width * 3.5 - passepartout()}
                y={pos().y + frameBorder()}
                width={passepartout() - frameBorder()}
                height={dimension.height * 3.5 - frameBorder() * 2}
                fill="#f8f8f8"
              />
              <Rect
                x={pos().x + frameBorder()}
                y={pos().y + frameBorder()}
                width={dimension.width * 3.5 - frameBorder() * 2}
                height={passepartout() * 1.1 - frameBorder()}
                fill="#f8f8f8"
              />

              <Rect
                x={pos().x + frameBorder()}
                y={pos().y + dimension.height * 3.5 - passepartout() * 1.1}
                width={dimension.width * 3.5 - frameBorder() * 2}
                height={passepartout() * 1.1 - frameBorder()}
                fill="#f8f8f8"
              />
            </Group>
            {/* shadow for passepartout. Sequence: left, right, top, bottom*/}
            <Group>
              <Rect
                x={pos().x + passepartout()}
                y={pos().y + passepartout() * 1.1 + 1}
                width={1}
                height={dimension.height * 3.5 - passepartout() * 1.1 * 2 - 1}
                fill="#eee"
                shadowBlur={0.25}
                shadowColor="#000"
                shadowOpacity={0.6}
                shadowOffset={{ x: 0, y: 0 }}
              />
              <Rect
                x={pos().x + dimension.width * 3.5 - passepartout()}
                y={pos().y + passepartout() * 1.1 + 1}
                width={1}
                height={dimension.height * 3.5 - passepartout() * 1.1 * 2 - 1}
                fill="#eee"
                shadowBlur={0.25}
                shadowColor="#000"
                shadowOpacity={0.6}
                shadowOffset={{ x: 0, y: 0 }}
              />
              <Rect
                x={pos().x + passepartout()}
                y={pos().y + passepartout() * 1.1}
                width={dimension.width * 3.5 - passepartout() * 2 + 1}
                height={1}
                fill="#ddd"
                shadowBlur={0.5}
                shadowColor="#000"
                shadowOpacity={0.2}
                shadowOffset={{ x: 0, y: 0 }}
              />
              <Rect
                x={pos().x + passepartout()}
                y={pos().y + dimension.height * 3.5 - passepartout() * 1.1}
                width={dimension.width * 3.5 - passepartout() * 2 + 1}
                height={1}
                fill="#fff"
              />
            </Group>
          </>
        ) : null}
        {/* shadow for frame. Sequence: left, right, top, bottom*/}
        <Rect
          x={pos().x + frameBorder()}
          y={pos().y + frameBorder() + 1}
          width={1}
          height={dimension.height * 3.5 - frameBorder() * 2 - 1}
          fill="#eee"
          shadowBlur={3}
          shadowColor="#ddd"
          shadowOpacity={0.7}
          shadowOffset={{ x: 2, y: 0 }}
        />
        <Rect
          x={pos().x + dimension.width * 3.5 - frameBorder()}
          y={pos().y + frameBorder() + 1}
          width={1}
          height={dimension.height * 3.5 - frameBorder() * 2 - 1}
          fill="#eee"
          shadowBlur={3}
          shadowColor="#ddd"
          shadowOpacity={0.7}
          shadowOffset={{ x: -2, y: 0 }}
        />
        <Rect
          x={pos().x + frameBorder()}
          y={pos().y + frameBorder()}
          width={dimension.width * 3.5 - frameBorder() * 2 + 1}
          height={1}
          fill="#ddd"
          shadowBlur={13}
          shadowColor="#000"
          shadowOpacity={1}
          shadowOffset={{ x: 0, y: 6 }}
        />
        <Rect
          x={pos().x + frameBorder()}
          y={pos().y + dimension.height * 3.5 - frameBorder()}
          width={dimension.width * 3.5 - frameBorder() * 2 + 1}
          height={1}
          fill="#fff"
          opacity={0.5}
        />
        <Text
          text={dimension.width + 'x' + dimension.height}
          x={pos().x + (dimension.width * 3.5) / 2 - 20}
          y={pos().y + dimension.height * 3.5 + 10}
          fontFamily={theme.typography.fontFamily}
          fontSize={Number(theme.typography.body1.fontSize)}
        />
      </>
    </Layer>
  );
};

export default CanvasFrame;
