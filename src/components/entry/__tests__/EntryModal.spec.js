import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { EntryModal } from '../EntryModal'
import { Modal } from 'semantic-ui-react'

jest.mock('universal-cookie')

const closeEntryModal = jest.fn()
const trigger = (<div />)

describe('entry component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should display correct text for new entry creation', () => {
    var modal = shallow(
      <EntryModal
        open
        initialModalValues={null}
        trigger={trigger}
        />
    )
    expect(modal.find(Modal.Header).props().content).toBe('Create an Entry')
    expect(toJson(modal)).toMatchSnapshot()
  })

  it('should display correct text for editing an entry', () => {
    var modal = shallow(
      <EntryModal
        open
        initialModalValues={{ rating: 5, notes: 'foo', date: '2017-01-01' }}
        trigger={trigger}
        />
    )
    expect(modal.find(Modal.Header).props().content).toBe('Edit an Entry')
    expect(toJson(modal)).toMatchSnapshot()
  })

  it('should close correctly', () => {
    var modal = shallow(
      <EntryModal
        open
        initialModalValues={{ rating: 5, notes: 'foo', date: '2017-01-01' }}
        closeEntryModal={closeEntryModal}
        trigger={trigger}
        />
    )
    modal.find(Modal).props().onClose()
    expect(closeEntryModal).toBeCalled()
  })
})
