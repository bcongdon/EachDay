import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Form, Message } from 'semantic-ui-react'
import SemanticReduxFormField from '../SemanticReduxFormField'

describe('SemanticReduxForm component', () => {
  it('should render correctly as a text area', () => {
    var form = shallow(
      <SemanticReduxFormField
        as={Form.TextArea}
        meta={{touched: false, error: ''}}
        input={{value: 'foo bar'}}
      />
    )
    expect(toJson(form)).toMatchSnapshot()
  })

  it('should not set error if not touched', () => {
    var form = shallow(
      <SemanticReduxFormField
        as={Form.TextArea}
        meta={{touched: false, error: 'Warning!'}}
        input={{value: 'foo bar'}}
      />
    )
    expect(form.find(Message).length).toBe(0)
    expect(toJson(form)).toMatchSnapshot()
  })

  it('should set error if touched and error', () => {
    var form = shallow(
      <SemanticReduxFormField
        as={Form.TextArea}
        meta={{touched: true, error: 'Warning!'}}
        input={{value: 'foo bar'}}
      />
    )
    expect(form.find(Message).length).toBe(1)
    expect(toJson(form)).toMatchSnapshot()
  })
})
