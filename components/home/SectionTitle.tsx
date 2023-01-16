import { Box, Button, Typography } from '@mui/material';

interface Props {
  title: string;
  summary?: string;
  isH1?: boolean;
  withButton?: boolean;
}

const SectionTitle = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography
        component={props.isH1 ? 'h1' : 'h2'}
        fontSize={props.isH1 ? 30 : 18}
        fontFamily="Comfortaa"
        fontWeight={600}
        width={props.isH1 ? 250 : 'fit-content'}
        lineHeight={1.15}
        sx={{ letterSpacing: -1.5 }}
      >
        {props.title}
      </Typography>
      {props.summary ? (
        <Typography
          component="h3"
          fontSize={13}
          fontFamily="Comfortaa"
          color="#888686"
          fontWeight={300}
          sx={{ letterSpacing: -0.2 }}
        >
          {props.summary}
        </Typography>
      ) : null}
      {props.withButton ? (
        <Button
          sx={{
            mt: 2,
            fontSize: props.isH1 ? 13 : 11,
            fontWeight: 500,
            width: 'fit-content',
            background: '#3086B7',
            padding: '16px 10px',
            color: '#fff',
            '&:hover': {
              background: '#EFEFEF',
              color: '#3A3335',
            },
          }}
        >
          Get Started
        </Button>
      ) : null}
    </Box>
  );
};

export default SectionTitle;
