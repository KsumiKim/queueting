import React from 'react';
import Header from '../UI/Header/Header';
import Toolbar from '../UI/Toolbar/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
const theme = unstable_createMuiStrictModeTheme();


const useStyles = makeStyles({
  content: {
    marginTop: '72px',
    width: '100%'
  }
});

const Layout = (props) => {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header
          links={<Toolbar />}
          fixed
        />
      </ThemeProvider>
      <main className={classes.content}>
          {props.children}
      </main>
    </>
  )
}

export default Layout;