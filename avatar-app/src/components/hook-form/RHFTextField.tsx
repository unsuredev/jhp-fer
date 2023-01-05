import * as React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

interface IRHFTextField {
  name: string;
  label: string;
  type?: 'text' | 'password';
  InputProps?: any;
  readonly?: boolean;
}

export default function RHFTextField({
  name,
  label,
  readonly,
  ...other
}: IRHFTextField) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error?.message}
          label={label}
          disabled={readonly}
          {...other}
        />
      )}
    />
  );
}
