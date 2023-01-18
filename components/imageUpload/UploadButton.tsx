import { Box, Button, Typography } from '@mui/material';
import { useSidebar } from '../../context/SidebarContext';
import { useUpload } from '../../context/UploadContext';
import { useUser } from '../../context/UserContext';
import { theme } from '../theme';
import ImageUploadModal from './ImageUploadModal';

interface Props {
  for: 'Poster' | 'Background';
}

const UploadButton = (props: Props) => {
  const { setOpenUploadModal } = useUpload();
  const { allPosters, allBackgrounds } = useSidebar();
  const { currentUser } = useUser();

  const handleClick = () => setOpenUploadModal(true); // TODO: idk but the modal opened maybe the same for both poster and background for now

  const checkNoOfUpload = () => {
    if (props.for === 'Poster') {
      return allPosters.filter((p) => p.user === currentUser?.uid).length >= 3;
    }
    if (props.for === 'Background') {
      return (
        allBackgrounds.filter((bg) => bg.user === currentUser?.uid).length >= 3
      );
    }
  };

  return (
    <Box width="100%" mt={2} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        sx={{ width: 'fit-content', mx: 'auto' }}
        onClick={handleClick}
        disabled={checkNoOfUpload()}
      >
        Upload Your Own
      </Button>

      {checkNoOfUpload() && (
        <Typography
          mt={0.5}
          variant="body2"
          textAlign="center"
          color={theme.palette.secondary.dark}
        >
          Upload limit exceeded (max. 3 images)
        </Typography>
      )}

      <ImageUploadModal for={props.for} />
    </Box>
  );
};

export default UploadButton;
