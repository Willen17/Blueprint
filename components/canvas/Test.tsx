import { Layer, Stage, Text } from 'react-konva';
import { useCanvas } from '../../context/CanvasContext';
import CanvasFrame from '../shared/CanvasFrame';
import { theme } from '../theme';

// this component is just for testing - many values to be changed later
function Test() {
  const { frameSet } = useCanvas();
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

      {frameSet.id && frameSet.size ? (
        <CanvasFrame frameSet={frameSet} />
      ) : null}
    </Stage>
  );
}

export default Test;
