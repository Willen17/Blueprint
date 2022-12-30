import { Image, Layer, Rect, Text } from 'react-konva';
import useImage from 'use-image';
import { useCanvas } from '../../context/CanvasContext';
import { frameDimensions } from '../../data/frameData';
import { theme } from '../theme';
import { FrameDimension } from '../types';

interface Props {
  size: FrameDimension;
}

const CanvasFrame = (props: Props) => {
  const { withPassepartout } = useCanvas();
  const [img1] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Ffour%20coca%20cola%20bottles.jpg?alt=media&token=7e1d8a77-358c-4a19-9742-1e91e09de6e2'
  );

  const pos = () => {
    const x = 20;
    const y = 50;
    return { x, y };
    //TODO: add logics so the pos doesnt overlap
  };

  const frameBorder = () => {
    let frameBorder;
    props.size === frameDimensions.xs
      ? (frameBorder = 8)
      : props.size === frameDimensions.sm
      ? (frameBorder = 8)
      : props.size === frameDimensions.md
      ? (frameBorder = 9)
      : props.size === frameDimensions.lg
      ? (frameBorder = 10)
      : (frameBorder = 10);
    return frameBorder;
  };

  const passepartout = () => {
    let passepartout = 0;
    // if (withPassepartout) {
    props.size === frameDimensions.xs
      ? (passepartout = 12)
      : props.size === frameDimensions.sm
      ? (passepartout = 16)
      : props.size === frameDimensions.md
      ? (passepartout = 21)
      : props.size === frameDimensions.lg
      ? (passepartout = 26)
      : (passepartout = 33);
    // }
    return passepartout + frameBorder();
  };

  return (
    <Layer draggable>
      <>
        <Rect
          x={pos().x}
          y={pos().y}
          width={props.size.width * 3.5}
          height={props.size.height * 3.5}
          fill="#fff"
          shadowBlur={15}
          shadowColor="#000"
          shadowOpacity={0.5}
          shadowOffset={{ x: 0, y: 5 }}
        />

        <Image
          image={img1}
          alt="cola"
          x={pos().x + frameBorder()}
          y={pos().y + frameBorder()}
          width={props.size.width * 3.5 - frameBorder() * 2}
          height={props.size.height * 3.5 - frameBorder() * 2}
        />
        {withPassepartout ? (
          <>
            {/*  passepartout. Sequence: left, right, top, bottom*/}
            <Rect
              x={pos().x + frameBorder()}
              y={pos().y + frameBorder()}
              width={passepartout() - frameBorder()}
              height={props.size.height * 3.5 - frameBorder() * 2}
              fill="#f8f8f8"
            />
            <Rect
              x={pos().x + props.size.width * 3.5 - passepartout()}
              y={pos().y + frameBorder()}
              width={passepartout() - frameBorder()}
              height={props.size.height * 3.5 - frameBorder() * 2}
              fill="#f8f8f8"
            />
            <Rect
              x={pos().x + frameBorder()}
              y={pos().y + frameBorder()}
              width={props.size.width * 3.5 - frameBorder() * 2}
              height={passepartout() * 1.1 - frameBorder()}
              fill="#f8f8f8"
            />

            <Rect
              x={pos().x + frameBorder()}
              y={pos().y + props.size.height * 3.5 - passepartout() * 1.1}
              width={props.size.width * 3.5 - frameBorder() * 2}
              height={passepartout() * 1.1 - frameBorder()}
              fill="#f8f8f8"
            />
            {/* shadow for passepartout. Sequence: left, right, top, bottom*/}
            <Rect
              x={pos().x + passepartout()}
              y={pos().y + passepartout() * 1.1 + 1}
              width={1}
              height={props.size.height * 3.5 - passepartout() * 1.1 * 2 - 1}
              fill="#eee"
              shadowBlur={0.25}
              shadowColor="#000"
              shadowOpacity={0.6}
              shadowOffset={{ x: 0, y: 0 }}
            />
            <Rect
              x={pos().x + props.size.width * 3.5 - passepartout()}
              y={pos().y + passepartout() * 1.1 + 1}
              width={1}
              height={props.size.height * 3.5 - passepartout() * 1.1 * 2 - 1}
              fill="#eee"
              shadowBlur={0.25}
              shadowColor="#000"
              shadowOpacity={0.6}
              shadowOffset={{ x: 0, y: 0 }}
            />
            <Rect
              x={pos().x + passepartout()}
              y={pos().y + passepartout() * 1.1}
              width={props.size.width * 3.5 - passepartout() * 2 + 1}
              height={1}
              fill="#ddd"
              shadowBlur={0.5}
              shadowColor="#000"
              shadowOpacity={0.2}
              shadowOffset={{ x: 0, y: 0 }}
            />
            <Rect
              x={pos().x + passepartout()}
              y={pos().y + props.size.height * 3.5 - passepartout() * 1.1}
              width={props.size.width * 3.5 - passepartout() * 2 + 1}
              height={1}
              fill="#fff"
            />
          </>
        ) : null}
        {/* shadow for frame. Sequence: left, right, top, bottom*/}
        <Rect
          x={pos().x + frameBorder()}
          y={pos().y + frameBorder() + 1}
          width={1}
          height={props.size.height * 3.5 - frameBorder() * 2 - 1}
          fill="#eee"
          shadowBlur={3}
          shadowColor="#ddd"
          shadowOpacity={0.7}
          shadowOffset={{ x: 2, y: 0 }}
        />
        <Rect
          x={pos().x + props.size.width * 3.5 - frameBorder()}
          y={pos().y + frameBorder() + 1}
          width={1}
          height={props.size.height * 3.5 - frameBorder() * 2 - 1}
          fill="#eee"
          shadowBlur={3}
          shadowColor="#ddd"
          shadowOpacity={0.7}
          shadowOffset={{ x: -2, y: 0 }}
        />
        <Rect
          x={pos().x + frameBorder()}
          y={pos().y + frameBorder()}
          width={props.size.width * 3.5 - frameBorder() * 2 + 1}
          height={1}
          fill="#ddd"
          shadowBlur={13}
          shadowColor="#000"
          shadowOpacity={1}
          shadowOffset={{ x: 0, y: 6 }}
        />
        <Rect
          x={pos().x + frameBorder()}
          y={pos().y + props.size.height * 3.5 - frameBorder()}
          width={props.size.width * 3.5 - frameBorder() * 2 + 1}
          height={1}
          fill="#fff"
          opacity={0.5}
        />

        <Text
          text={props.size.width + 'x' + props.size.height}
          x={(pos().x + props.size.width * 3.5) / 2 - 7.5}
          y={pos().y + props.size.height * 3.5 + 10}
          fontFamily={theme.typography.fontFamily}
          fontSize={Number(theme.typography.body1.fontSize)}
        />
      </>
    </Layer>
  );
};

export default CanvasFrame;
