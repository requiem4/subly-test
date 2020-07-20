import { AuthPage } from '../AuthPage'
import { shallow } from 'enzyme'

describe('Auth Page',()=>{
  let wrapper
  const output = 10

  beforeEach(()=>{
    wrapper = shallow(<AuthPage output={output}/>)

  })

  it('+++ render the DUMB component', () => {
    expect(wrapper.length).toEqual(1)
  });

  it('+++ contains output', () => {
    expect(wrapper.find('input[placeholder="Output"]').prop('value')).toEqual(output)
  });

});



import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

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

it("renders with or without a name", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");

  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
});