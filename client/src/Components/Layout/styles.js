import { makeStyles } from "@material-ui/core/styles";
const primary = "#183c5e";
export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    // width: `calc(100vw - 240px)`,
    minHeight: "100vh",
    display: 'flex',
    width: '100%',
    marginTop: '65px'
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  body:{
    overflow: 'scroll'
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: primary,
      outline: '1px solid slategrey'
    }
  },
}));
