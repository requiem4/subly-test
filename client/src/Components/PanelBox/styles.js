import {makeStyles} from "@material-ui/styles";

export default makeStyles(theme => ({
  widgetWrapper: {
    display: "flex",
    width: '100%',

  },
  widgetRoot: {
    boxShadow: theme.customShadows.widget,
  },
  noPadding: {
    padding: 0,
  },
  widgetContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    minHeight: 100,
    padding: '20px',
    borderRadius: '10px',
    color: theme.palette.white.main,
    background: theme.palette.dark.background
  },
  moreButton: {
    margin: -theme.spacing(1),
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "rgba(255, 255, 255, 0.35)",
    },
  },
  dark: props => ({
    color: theme.palette.white.main,
    background: theme.palette.primary.dark
  }),
}));
