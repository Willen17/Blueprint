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
    let passepartout;
    props.size === frameDimensions.xs
      ? (passepartout = 20)
      : props.size === frameDimensions.sm
      ? (passepartout = 24)
      : props.size === frameDimensions.md
      ? (passepartout = 30)
      : props.size === frameDimensions.lg
      ? (passepartout = 36)
      : (passepartout = 43);
    return passepartout;
  };

  return (
    <Layer draggable>
      {withPassepartout ? (
        <>
          <Rect
            x={pos().x}
            y={pos().y}
            width={props.size.width * 3.5}
            height={props.size.height * 3.5}
            fill="#000"
            shadowBlur={15}
            shadowColor="black"
            shadowOpacity={0.5}
            shadowOffset={{ x: 0, y: 5 }}
          />
          <Rect
            x={pos().x + frameBorder()}
            y={pos().y + frameBorder()}
            width={props.size.width * 3.5 - frameBorder() * 2}
            height={props.size.height * 3.5 - frameBorder() * 2}
            fill="#f8f8f8"
          />
          <Image
            image={img1}
            alt="cola"
            x={pos().x + passepartout()}
            y={pos().y + passepartout()}
            width={props.size.width * 3.5 - passepartout() * 2}
            height={props.size.height * 3.5 - passepartout() * 2}
            shadowBlur={1}
            shadowColor="#000"
            shadowOpacity={0.6}
            shadowOffset={{ x: 0, y: 0 }}
          />
          <Text
            text={props.size.width + 'x' + props.size.height}
            x={(pos().x + props.size.width * 3.5) / 2 - 7.5}
            y={pos().y + props.size.height * 3.5 + 10}
            fontFamily={theme.typography.fontFamily}
            fontSize={Number(theme.typography.body1.fontSize)}
          />
        </>
      ) : null}
    </Layer>
  );
};

export default CanvasFrame;
