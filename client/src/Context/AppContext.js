import React  from 'react'
import { UserProvider, useUserState } from './UserContext'
import AppLayout from "../Components/Layout/AppLayout";
import Main from "../Pages/Auth/Main";
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
var AppStateContext = React.createContext();
var AppDispatchContext = React.createContext();
function AppProvider({children}) {
  // const [isLoading, setLoading] = useState(true);
  // const [isAuthenticated, setAuth] = useState(false);
  var [state, dispatch] = React.useReducer(AppReducer, {
    isSidebarOpened: true,
  })
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <UserProvider>{children}</UserProvider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}
function AppReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
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
  var { isAuthenticated } = useUserState();
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/dashboard" />}
        />
        <PublicRoute path="/login" component={Main} />
        <PrivateRoute path="/" component={AppLayout} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  function PrivateRoute({ component, ...rest }) {
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

  function PublicRoute({ component, ...rest }) {
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
export {AppProvider, Authenticate, useAppState, useAppDispatch}
