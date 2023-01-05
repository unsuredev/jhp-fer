import React, { useMemo } from 'react';
// material
import { CssBaseline, Theme, ThemeOptions } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
//
import { palette } from './palette';
import { typography } from './typography';
import { ComponentsOverrides } from './overrides';
import { customShadows, shadows } from './shadows';

// ----------------------------------------------------------------------

export interface ITheme extends Theme {
  customShadows: {
    z1: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  };
  // children?: any;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme as any);

  return (
    <StyledEngineProvider injectFirst={false}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};
