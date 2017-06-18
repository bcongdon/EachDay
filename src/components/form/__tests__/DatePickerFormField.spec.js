import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import DatePickerFormField from '../DatePickerFormField'

const onChange = jest.fn()

describe('DatePickerFormField component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    Date.now = jest.fn(() => 1495984743025)
    Date.prototype.getTimezoneOffset = () => 0 // eslint-disable-line no-extend-native
  })

  it('should render correctly', () => {
    var field = mount(
      <DatePickerFormField
        input={{onChange, value: '2017-01-01'}}
        meta={{touched: false, error: ''}}
      />
    )
    expect(toJson(field)).toMatchSnapshot()
  })

  it('should set default date if none provided', () => {
    mount(
      <DatePickerFormField
        input={{onChange, value: ''}}
        meta={{touched: false, error: ''}}
      />
    )
    expect(onChange).toBeCalled()
    expect(onChange.mock.calls[0][0]).toEqual('2017-05-28')
  })

  it('should not display error if not touched', () => {
    var field = mount(
      <DatePickerFormField
        input={{onChange, value: '2017-01-01'}}
        meta={{touched: false, error: 'Warning!'}}
      />
    )
    expect(field.find('span').length).toBe(0)
    expect(toJson(field)).toMatchSnapshot()
  })

  it('should display error if touched', () => {
    var field = mount(
      <DatePickerFormField
        input={{onChange, value: '2017-01-01'}}
        meta={{touched: true, error: 'Warning!'}}
      />
    )
    expect(field.find('span').length).toBe(1)
    expect(field.find('span').first().text()).toEqual('Warning!')
    expect(toJson(field)).toMatchSnapshot()
  })
})
