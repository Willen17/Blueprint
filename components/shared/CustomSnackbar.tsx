import { Snackbar, SnackbarContent } from '@mui/material';
import { useNotification } from '../../context/NotificationContext';

const CustomSnackbar = () => {
  const { notification, setNotification } = useNotification();
  return (
    <Snackbar
      autoHideDuration={3000}
      open={Boolean(notification !== undefined)}
      onClose={() => setNotification(undefined)}
    >
      <SnackbarContent
        message={notification?.message}
        sx={{
          background:
            notification?.type === 'Warning'
              ? '#B7301D'
              : notification?.type === 'Success'
              ? '#3086B7'
              : '#3A3335',
        }}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
