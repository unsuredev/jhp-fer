import * as React from 'react';
// icons
import { Icon, IconifyIcon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

interface IIconify {
  icon: IconifyIcon | string;
  sx?: any;
  width?: number;
  height?: number;
  inline?:boolean;
}

export default function Iconify({ icon, sx,inline, ...other }: IIconify) {
  return <Box inline={inline} component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
