import { Box } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { frameDimensions } from '../../data/frameData';
import { Dimension } from '../types';

interface Props {
  isWhiteFrame?: boolean;
  bgColor?: string;
  bgImg?: { src: StaticImageData; alt: string };
  size: Dimension;
  children: ReactNode;
}

const PlainFrame = (props: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        width: props.size ? props.size!.width * 3.5 : null,
        height: props.size ? props.size!.height * 3.5 : null,
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
          fill
          alt={props.bgImg.alt}
          src={props.bgImg.src}
          style={{ zIndex: '-2' }}
          sizes="100%"
        />
      ) : null}
      {/* Inner */}
      <Box
        sx={{
          width:
            props.size === frameDimensions.xs
              ? '82%'
              : props.size === frameDimensions.sm
              ? '84%'
              : props.size === frameDimensions.md
              ? '86%'
              : props.size === frameDimensions.lg
              ? '88%'
              : '90%',
          height:
            props.size === frameDimensions.xs
              ? '84%'
              : props.size === frameDimensions.sm
              ? '86%'
              : props.size === frameDimensions.md
              ? '88%'
              : props.size === frameDimensions.lg
              ? '90%'
              : '92%',
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
