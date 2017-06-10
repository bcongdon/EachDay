import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Entry } from '../Entry'
import { Dropdown } from 'semantic-ui-react'

jest.mock('universal-cookie')

const openEntryModal = jest.fn()
const deleteEntry = jest.fn()

describe('entry component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render a basic entry correctly', () => {
    var dash = shallow(
      <Entry
        id={1}
        rating={5}
        date='2017-01-01'
        notes='Foo bar baz'
        openEntryModal={openEntryModal}
        deleteEntry={deleteEntry}
        />
    )
    expect(toJson(dash)).toMatchSnapshot()
  })

  it('should render without notes', () => {
    var dash = shallow(
      <Entry
        id={1}
        rating={5}
        date='2017-01-01'
        openEntryModal={openEntryModal}
        deleteEntry={deleteEntry}
        />
    )
    expect(toJson(dash)).toMatchSnapshot()
  })

  it('should render without a rating', () => {
    var dash = shallow(
      <Entry
        id={1}
        date='2017-01-01'
        notes='Foo bar baz'
        openEntryModal={openEntryModal}
        deleteEntry={deleteEntry}
        />
    )
    expect(toJson(dash)).toMatchSnapshot()
  })

  it('should call openEntryModel on edit click', () => {
    var dash = mount(
      <Entry
        id={1}
        date='2017-01-01'
        notes='Foo bar baz'
        openEntryModal={openEntryModal}
        deleteEntry={deleteEntry}
        />
    )
    dash.find(Dropdown.Item).findWhere((n) => n.props().icon === 'delete').simulate('click')
    expect(deleteEntry).toBeCalled()
  })

  it('should call deleteEntry on delete click', () => {
    var dash = mount(
      <Entry
        id={1}
        date='2017-01-01'
        notes='Foo bar baz'
        openEntryModal={openEntryModal}
        deleteEntry={deleteEntry}
        />
    )
    dash.find(Dropdown.Item).findWhere((n) => n.props().icon === 'edit').simulate('click')
    expect(openEntryModal).toBeCalled()
  })
})
