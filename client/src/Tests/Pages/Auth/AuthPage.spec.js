import AuthPage from '../../../Pages/Auth/AuthPage'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import App from "../../../App";

Enzyme.configure({adapter: new Adapter()})

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Auth Page', () => {
  it("should render a greeting", () => {
    act(() => {
      render(
        <App>
          <AuthPage/>
        </App>, container);
    });

  });

});




