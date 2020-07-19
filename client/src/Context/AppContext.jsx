import React from 'react'
import AppLayout from "../Components/Layout/AppLayout";
import AuthPage from "../Pages/Auth/AuthPage";
import ForgotPasswordPage from '../Pages/Auth/ForgotPasswordPage'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {useSelector} from "react-redux";

var AppStateContext = React.createContext();
var AppDispatchContext = React.createContext();

function AppProvider({children}) {
  var [state, dispatch] = React.useReducer(AppReducer, {
    isSidebarOpened: true,
  })
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

function AppReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {...state, isSidebarOpened: !state.isSidebarOpened};
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAppState() {
  var context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
}

function useAppDispatch() {
  var context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
}

function Authenticate() {
  var {isAuthenticated} = useSelector(state => state.auth);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/dashboard"/>}
        />
        <PublicRoute path="/login" component={AuthPage}/>
        <PublicRoute path="/change-password" component={ForgotPasswordPage}/>
        <PrivateRoute path="/" component={AppLayout}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );

  function PrivateRoute({component, ...rest}) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({component, ...rest}) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
export const history = createBrowserHistory();
export {AppProvider, Authenticate, useAppState, useAppDispatch}
