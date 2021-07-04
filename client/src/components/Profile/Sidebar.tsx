import { ListItem, List, ListItemText, makeStyles, Typography, Box, Theme } from '@material-ui/core'
import { FC } from 'react';
import { Caption } from './Caption';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    paddingBottom: theme.spacing(2),
  }
}));

type SidebarProps = {
  currentTab: 'Персональные' | 'Блоги',
  setCurrentTab: any,
}

export const Sidebar: FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const classes = useStyles();
  return (
    <>
      <Caption title="Настройки" description="Customize view and extra actions" />
      <List className={classes.list}>
        {['Персональные', 'Блоги'].map((text, idx) => (
          <ListItem button key={text} onClick={() => setCurrentTab(text)} selected={text === currentTab}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
