import { Box } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

interface Props {
  isWhiteFrame?: boolean;
  bgColor?: string;
  bgImg?: { src: StaticImageData; alt: string };
  children: ReactNode;
}

const PlainFrame = (props: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        width: '175px',
        height: '245px',
        zIndex: '-2',
        boxSizing: 'border-box',
        background: props.isWhiteFrame
          ? '#fff'
          : props.bgColor || 'transparent',
        boxShadow: props.isWhiteFrame
          ? '0px 1em 2em -1em rgba(0,0,0,.4),0px 2em 2em -1em rgba(0,0,0,.15),0px 1em 1em -1em rgba(0, 0, 0, .15),0px 1em 1.5em -1em rgba(0,0,0,.15),0px 1em 1em .5em rgba(0,0,0,.1), inset 0 .2em .1em #fff'
          : '0px 1em 2em -1em rgba(0,0,0,.4),0px 2em 2em -1em rgba(0,0,0,.15),0px 1em 1em -1em rgba(0, 0, 0, .15),0px 1em 1.5em -1em rgba(0,0,0,.15),0px 1em 1em .5em rgba(0,0,0,.1), inset 0 .2em .1em #000',
      }}
    >
      {props.bgImg ? (
        <Image
          alt={props.bgImg.alt}
          src={props.bgImg.src}
          fill
          style={{ zIndex: '-2' }}
        />
      ) : null}
      {/* Inner */}
      <Box
        sx={{
          width: '90%',
          height: '92%',
          m: 'auto auto',
          bgcolor: '#f8f8f8',
          zIndex: '-1',
          display: 'flex',
          boxShadow:
            'inset 0px 8px 0.5em rgba(0, 0, 0, 0.25), inset 0.1em 0px 0.1em rgba(0, 0, 0, 0.1),inset -0.1em 0px 0.1em rgba(0, 0, 0, 0.05)',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default PlainFrame;
