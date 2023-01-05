import * as React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

// ----------------------------------------------------------------------

interface IRHFRadio {
  name: string;
  label?: string;
  radios: Array<{ value: unknown; label: string }>;
  InputProps?: any;
  row?: boolean;
  id?: string;
  defaultValue?: unknown;
  readonly?: boolean;
}

export function RHFRadio({
  name,
  label,
  radios,
  row,
  id,
  readonly,
  ...other
}: IRHFRadio) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          {label && <FormLabel id={id ?? 'radio-default'}>{label}</FormLabel>}
          <RadioGroup
            row={row ?? true}
            aria-labelledby={id ?? 'radio-default'}
            defaultValue={'systemUser'}
            {...field}>
            {radios.map((item, index) => (
              <FormControlLabel
                disabled={readonly}
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
