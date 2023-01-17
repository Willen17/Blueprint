import { Button } from '@mui/material';
import { useUpload } from '../../context/UploadContext';
import ImageUploadModal from './ImageUploadModal';

interface Props {
  for: 'Poster' | 'Background';
}

const UploadButton = (props: Props) => {
  const { setOpenUploadModal } = useUpload();

  const handleClick = () => {
    if (props.for === 'Background') console.log('upload background');
    if (props.for === 'Poster') setOpenUploadModal(true);
  };

  return (
    <>
      <Button
        sx={{ width: 'fit-content', mx: 'auto', mt: 2 }}
        onClick={handleClick}
      >
        Upload Your Own
      </Button>

      <ImageUploadModal for={props.for} />
    </>
  );
};

export default UploadButton;
