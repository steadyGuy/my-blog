import { OutlinedInputProps, TextField } from '@material-ui/core'
import React, { FC } from 'react'

type InputProps = {
  formik: any;
  autoFocus?: boolean;
  name: string;
  label: string
  InputProps?: Partial<OutlinedInputProps>;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}

export const Input: FC<InputProps> = ({ formik, autoFocus = false, name, label, ...props }) => {
  return (
    <TextField
      error={!!formik.errors[name] && !!formik.touched[name]}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={name}
      label={label}
      name={name}
      autoComplete={name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      autoFocus={autoFocus}
      helperText={formik.touched[name] && formik.errors[name] ? formik.errors[name] : null}
      {...props}
    />
  )
}
