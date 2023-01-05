import { Divider, Grid, IconButton, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import * as React from 'react';
import Iconify from './Iconify';

interface IDrawer {
  children: React.ReactNode;
  anchor?: 'bottom' | 'top' | 'left' | 'right';
  onClose?: Function;
  open?: boolean;
  variant?: 'md' | 'sm' | 'full' | 'lg';
  title?: string;
}

const heightMap = new Map([
  ['md', '60vh'],
  ['sm', '45vh'],
  ['full', '100vh'],
  ['lg', '75vh'],
]);

export const Drawer: React.FunctionComponent<IDrawer> = ({
  children,
  anchor = 'bottom',
  onClose,
  open,
  variant = 'md',
  title,
}: IDrawer) => {
  return (
    <MuiDrawer
      anchor={anchor}
      key={'drawer'}
      open={open}
      onClose={() => {
        onClose && onClose();
      }}>
      <div
        style={{
          height: ['bottom', 'top'].includes(anchor)
            ? heightMap.get(variant)
            : undefined,
          width: ['left', 'right'].includes(anchor)
            ? heightMap.get(variant)
            : undefined,
        }}>
        <Grid
          padding={2}
          container
          justifyContent={title ? 'space-between' : 'flex-end'}>
          {title && (
            <Grid item>
              <Typography variant='h5'>{title}</Typography>
            </Grid>
          )}
          <Grid item>
            <IconButton
              color='secondary'
              aria-label='basic-menu'
              id='long-button'
              aria-haspopup='true'
              onClick={() => {
                onClose && onClose();
              }}>
              <Iconify
                icon={'ep:close'}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ my: 0.5, mb: 2 }} />
        <Grid padding={2} paddingTop={0}>
          {children}
        </Grid>
      </div>
    </MuiDrawer>
  );
};
