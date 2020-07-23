import AuthPage  from '../AuthPage'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

describe('Auth Page',()=>{
  debugger
  let wrapper, container = '';
  const output = 10

  beforeEach(()=>{
    wrapper = shallow(<AuthPage/>)

  })

  it('+++ render the DUMB component', () => {
    expect(wrapper.length).toEqual(1)
  });

  it('+++ contains output', () => {
    expect(wrapper.find('input[placeholder="Output"]').prop('value')).toEqual(output)
  });

  it("renders with or without a name", () => {
    act(() => {
      render(<AuthPage />, wrapper);
    });
    expect(wrapper.textContent).toBe("Hey, stranger");

    act(() => {
      render(<AuthPage name="Jenny" />, wrapper);
    });
    expect(wrapper.textContent).toBe("Hello, Jenny!");

    act(() => {
      render(<AuthPage name="Margaret" />, wrapper);
    });
    expect(wrapper.textContent).toBe("Hello, Margaret!");
  });

});




