import { IconButton, InputAdornment, OutlinedInputProps, TextField, Box, Typography, Theme, makeStyles, createStyles } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Dispatch, FC, SetStateAction } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerLine: {
      margin: `${theme.spacing(2)}px 0`,
      width: '100%',
      height: '2px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.palette.grey[200],
      position: 'relative',
      '& p': {
        position: 'absolute',
        backgroundColor: '#fff',
        color: theme.palette.grey[500],
        padding: `0 ${theme.spacing(2.5)}px`,
        top: -theme.typography.fontSize / 2 - 2, // where - 2 is the size of headerLine (2px)
      }
    },
    inputLabel: {
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(4),
      width: '25%',
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  }),
);

type InputProps = {
  formik: any;
  autoFocus?: boolean;
  name: string;
  label: string
  InputProps?: Partial<OutlinedInputProps>;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  fullWidth?: boolean;
  className?: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  withPassword?: boolean;
}

export const Input: FC<InputProps> = (
  { formik,
    fullWidth = true,
    autoFocus = false,
    name,
    label,
    setShowPassword,
    showPassword,
    withPassword = false,
    ...props }
) => {

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      error={!!formik.errors[name] && !!formik.touched[name]}
      variant="outlined"
      margin="normal"
      required
      fullWidth={fullWidth}
      id={name}
      label={label}
      name={name}
      autoComplete={name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      autoFocus={autoFocus}
      helperText={formik.touched[name] && formik.errors[name] ? formik.errors[name] : null}
      InputProps={withPassword ? {
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword?.(prev => !prev)}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
      } : {}}
      {...props}
    />
  )
};

type InputStyledProps = {
  title?: string;
  inputTitle: string
}

export const InputStyled: FC<InputStyledProps> = ({ children, title, inputTitle }) => {
  const classes = useStyles();
  return (
    <>
      {title &&
        <Box className={classes.headerLine}>
          <Typography variant="body2">{title}</Typography>
        </Box>
      }

      <Box className={classes.inputWrapper}>
        <Typography color="textSecondary" variant="body1" className={classes.inputLabel}>{inputTitle}</Typography>
        {children}
      </Box>
    </>
  )
}
