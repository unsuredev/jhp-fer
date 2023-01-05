// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// ----------------------------------------------------------------------

interface IRHFCheckbox {
  name: string;
  label: string;
  readonly?: boolean;
}

export function RHFCheckbox({ name, label, readonly, ...other }: IRHFCheckbox) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox {...field} disabled={readonly} checked={field.value} />
          )}
        />
      }
      label={label}
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFMultiCheckbox {
  name: string;
  options: Array<{ label: string; value: string; readonly?: boolean }>;
}

export function RHFMultiCheckbox({
  name,
  options,
  ...other
}: RHFMultiCheckbox) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    disabled={option.readonly}
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(onSelected(option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
