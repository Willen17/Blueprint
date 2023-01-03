import { Box, Typography } from '@mui/material';
import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';

const MobileSidebar = () => {
  const { openMobileSection, setOpenMobileSection } = useSidebar();

  return (
    <Box
      minHeight={40}
      maxHeight={40}
      bgcolor="#FBFBFB"
      borderBottom="#F1F1F1 1px solid"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        placeItems: 'center',
        placeContent: 'center',
        gap: 3,
      }}
    >
      {sidebarSections.map((section, index) => (
        <Typography
          key={section}
          variant="body1"
          component="h2"
          onClick={() => setOpenMobileSection(sidebarSections[index])}
          sx={{
            cursor: 'pointer',
            width: index === 0 ? 65 : 35,
            textAlign: 'center',
            borderBottom:
              openMobileSection === section ? '1px solid #000' : 'none',
            fontWeight: openMobileSection === section ? 600 : 400,
            '&:hover': {
              fontWeight: 600,
            },
          }}
        >
          {sidebarSections[index]}
        </Typography>
      ))}
    </Box>
  );
};

export default MobileSidebar;
