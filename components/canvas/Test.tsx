import { Image, Layer, Rect, Stage, Text } from 'react-konva';
import useImage from 'use-image';
import { frameDimensions } from '../../data/frameData';
import CanvasFrame from '../shared/CanvasFrame';
import { theme } from '../theme';

// this component is just for testing - many values to be changed later
function Test() {
  const [img1] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Ffour%20coca%20cola%20bottles.jpg?alt=media&token=7e1d8a77-358c-4a19-9742-1e91e09de6e2'
  );

  const [img2] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fmilky%20way%20with%20mountains.jpeg?alt=media&token=ead8bbfe-f1e5-423d-89ee-aab6847ebac8'
  );

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        maxHeight: 'calc(100vh - 50px)',
        maxWidth: '100vw',
        overflow: 'clip',
      }}
    >
      <Layer>
        <Text
          text="Close the drawer in order to be able to drag the frame!"
          x={50}
          y={20}
          fill="brown"
          fontSize={20}
          fontFamily={theme.typography.fontFamily}
          fontVariant="bold"
        />
      </Layer>
      <CanvasFrame size={frameDimensions.xs} />
      <CanvasFrame size={frameDimensions.sm} />
      <CanvasFrame size={frameDimensions.md} />
      <CanvasFrame size={frameDimensions.lg} />
      <CanvasFrame size={frameDimensions.xl} />
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
        <Image
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
  );
}

export default Test;
