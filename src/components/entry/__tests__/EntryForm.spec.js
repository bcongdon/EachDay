import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { EntryForm } from '../EntryForm'
import { Button } from 'semantic-ui-react'

jest.mock('universal-cookie')

const handleSubmit = jest.fn()
const createEntry = jest.fn()
const closeEntryModal = jest.fn()
const editEntry = jest.fn()

describe('entry component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly with blank data', () => {
    var form = shallow(
      <EntryForm
        handleSubmit={handleSubmit}
        isNewEntry
        createEntry={createEntry}
        closeEntryModal={closeEntryModal}
        editEntry={editEntry}
        errorMessage=''
        />
    )
    expect(toJson(form)).toMatchSnapshot()
  })

  it('should render correctly with an error message', () => {
    var form = shallow(
      <EntryForm
        handleSubmit={handleSubmit}
        isNewEntry
        createEntry={createEntry}
        closeEntryModal={closeEntryModal}
        editEntry={editEntry}
        errorMessage='Something went wrong'
        />
    )
    expect(toJson(form)).toMatchSnapshot()
  })

  it('should call handleSubmit on submit', () => {
    var form = shallow(
      <EntryForm
        handleSubmit={handleSubmit}
        isNewEntry
        createEntry={createEntry}
        closeEntryModal={closeEntryModal}
        editEntry={editEntry}
        errorMessage=''
        />
    )
    form.find(Button).simulate('click')
    expect(handleSubmit).toBeCalled()
  })

  it('should call createEntry in handleFormSubmit if entry is new', () => {
    var form = shallow(
      <EntryForm
        handleSubmit={handleSubmit}
        isNewEntry
        createEntry={createEntry}
        closeEntryModal={closeEntryModal}
        editEntry={editEntry}
        errorMessage=''
        />
    )
    const formProps = {foo: 'bar'}
    form.instance().handleFormSubmit(formProps)
    expect(createEntry).toBeCalled()
    expect(createEntry.mock.calls[0][0]).toEqual(formProps)
    expect(editEntry).not.toBeCalled()
  })

  it('should call editEntry in handleFormSubmit if entry already exists', () => {
    var form = shallow(
      <EntryForm
        handleSubmit={handleSubmit}
        isNewEntry={false}
        createEntry={createEntry}
        closeEntryModal={closeEntryModal}
        editEntry={editEntry}
        errorMessage=''
        />
    )
    const formProps = {foo: 'bar'}
    form.instance().handleFormSubmit(formProps)
    expect(editEntry).toBeCalled()
    expect(editEntry.mock.calls[0][0]).toEqual(formProps)
    expect(createEntry).not.toBeCalled()
  })
})
