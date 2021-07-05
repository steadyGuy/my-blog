import { Button, makeStyles, Theme } from '@material-ui/core'
import { FC } from 'react'

type ButtonProps = {
  title: string;
  color?: string;
  type?: string;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export const SubmitButton: FC<ButtonProps> = ({ title, type = 'submit', color = 'primary', fullWidth = true, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      type={type}
      className={classes.submit}
      fullWidth={fullWidth}
      size="large"
      variant="contained"
      color={color}
      {...props}
    >
      {title}
    </Button>
  )
}
