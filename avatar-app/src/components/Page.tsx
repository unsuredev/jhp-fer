import * as React from 'react';
import {forwardRef} from 'react';
import {Helmet} from 'react-helmet-async';
// @mui
import {Box} from '@mui/material';

// ----------------------------------------------------------------------

interface IPage {
    children: React.ReactNode;
    title: string;
    meta?: React.ReactNode;
    width?: string | number;
    height?: string | number;
}

export const Page = forwardRef(
  ({ children, title = '', meta, ...other }: IPage, ref) => (
    <>
      <Helmet>
        <title>{`${title} | Rolex`}</title>
        {meta}
      </Helmet>

      <Box className='ph-16' ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);
