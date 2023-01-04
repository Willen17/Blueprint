import { Box } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isToClose?: boolean;
}

const SidebarToggleButton = (props: Props) => {
  return (
    <Box bgcolor="#FBFBFB" width={5} sx={{ borderLeft: '1px solid #F8F8F8' }}>
      <Box
        bgcolor="#F8F8F8"
        position="absolute"
        width={15}
        height={110}
        onClick={props.onClick}
        display="flex"
        sx={{
          right: props.isToClose ? null : 6,
          left: props.isToClose ? 0 : null,
          mt: props.isToClose ? null : '25px',
          top: '50%',
          zIndex: 999,
          border: '1px solid #F8F8F8',
          borderRadius: '10px 0 0 10px',
          transform: 'translateY(-50%)',
          placeItems: 'center',
          cursor: 'pointer',
        }}
      >
        {props.isToClose ? (
          <IconChevronRight color="#898989" />
        ) : (
          <IconChevronLeft color="#898989" />
        )}
      </Box>
    </Box>
  );
};

export default SidebarToggleButton;
