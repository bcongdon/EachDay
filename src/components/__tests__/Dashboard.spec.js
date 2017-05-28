import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Dashboard } from '../Dashboard.js'

jest.mock('universal-cookie')
Date.now = jest.fn(() => 1495984743025)

describe('Dashboard', () => {
  it('should load and show loaders entries on mount', () => {
    const loadEntries = jest.fn()
    var dash = shallow(
      <Dashboard
        loading
        entries={[]}
        openEntryModal={jest.fn()}
        loadEntries={loadEntries}
        />
    )
    expect(loadEntries).toBeCalled()
    expect(dash.find('Loader').length).toEqual(2)
  })

  it('should show message when no entries exist', () => {
    var dash = shallow(
      <Dashboard
        loading={false}
        entries={[]}
        openEntryModal={jest.fn()}
        loadEntries={jest.fn()}
        />
    )
    expect(toJson(dash)).toMatchSnapshot()
    const message = dash.find('Message').render().text()
    expect(message).toEqual(expect.stringContaining('You don\'t have any entries'))
  })

  it('should render errors', () => {
    var dash = shallow(
      <Dashboard
        loading={false}
        entries={[]}
        openEntryModal={jest.fn()}
        loadEntries={jest.fn()}
        error='foo'
        />
    )
    expect(toJson(dash)).toMatchSnapshot()
    const errors = dash.find('ErrorMessage')
    expect(errors.length).toBe(1)
    expect(errors.render().text()).toEqual(expect.stringContaining('foo'))
  })

  it('should have composeEntryButton', () => {
    const openEntryModal = jest.fn()
    var dash = shallow(
      <Dashboard
        entries={[]}
        openEntryModal={openEntryModal}
        loadEntries={jest.fn()}
        />
    )
    const btn = dash.find('Connect(EntryModal)').prop('trigger')
    btn.props.onClick() // 'Click' the trigger button
    expect(openEntryModal).toBeCalled()
  })

  it('should render entries on calendar heatmap', () => {
    const entries = [
      { id: 1, rating: 3, date: '2017-05-01' },
      { id: 2, rating: 5, date: '2017-05-02' },
      { id: 3, rating: 4, date: '2017-05-03' }
    ]
    var dash = shallow(
      <Dashboard
        entries={entries}
        openEntryModal={jest.fn()}
        loadEntries={jest.fn()}
        />
    )
    expect(dash.find('Connect(Entry)').length).toBe(entries.length)
    expect(toJson(dash)).toMatchSnapshot()
  })
})
