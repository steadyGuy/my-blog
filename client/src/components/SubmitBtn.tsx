import { Button, makeStyles, Theme } from '@material-ui/core'
import { FC } from 'react'

type ButtonProps = {
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export const SubmitButton: FC<ButtonProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      className={classes.submit}
      fullWidth
      size="large"
      variant="contained"
      color="primary"
    >
      {title}
    </Button>
  )
}
