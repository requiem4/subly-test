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