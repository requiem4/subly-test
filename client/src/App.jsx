import React from 'react';
import {Provider} from 'react-redux'
import store from './Stores/Index'
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import Themes from "./Themes";
import {AppProvider, Authenticate} from "./Context/AppContext";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppProvider>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline/>
            <Authenticate/>
          </ThemeProvider>
        </AppProvider>
      </Provider>
    );
  }
}
