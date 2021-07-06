import { Button, makeStyles, PropTypes, Theme } from '@material-ui/core'
import { FC } from 'react'

type ButtonProps = {
  title: string;
  color?: PropTypes.Color;
  type?: "submit" | "button" | "reset" | undefined;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export const SubmitButton: FC<ButtonProps> = ({ className, title, onClick, type = 'submit', color = 'primary', fullWidth = true, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      type={type}
      className={className}
      fullWidth={fullWidth}
      size="large"
      variant="contained"
      color={color}
      onClick={onClick}
      {...props}
    >
      {title}
    </Button>
  )
}
