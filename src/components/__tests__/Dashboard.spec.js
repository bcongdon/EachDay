import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Dashboard } from '../Dashboard.js'
import { scroller } from 'react-scroll'
import { Message } from 'semantic-ui-react'

jest.mock('universal-cookie')
jest.mock('react-scroll')

describe('Dashboard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    Date.now = jest.fn(() => 1495984743025)
  })

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

  it('should give classes to calendar days correctly', () => {
    var dash = shallow(
      <Dashboard
        entries={[]}
        openEntryModal={jest.fn()}
        loadEntries={jest.fn()}
        />
    )
    const classForValue = dash.instance().classForValue
    expect(classForValue(null)).toBe('ui color-empty')
    expect(classForValue({date: '2017-01-01'})).toBe('ui color-empty')
    expect(classForValue({date: '2017-01-01', count: 5})).toBe('ui color-scale-5')
  })

  it('should scroll correctly when an entry is clicked', () => {
    var dash = shallow(
      <Dashboard
        entries={[]}
        openEntryModal={jest.fn()}
        loadEntries={jest.fn()}
        />
    )
    const onEntryClick = dash.instance().onEntryClick
    onEntryClick({})
    expect(scroller.scrollTo).not.toBeCalled()
    onEntryClick({id: 5})
    expect(scroller.scrollTo).toBeCalled()
    expect(scroller.scrollTo.mock.calls[0]).toEqual(['entry-5', { duration: 250, smooth: true }])
  })

  it('should render custom tooltip titles correctly', () => {
    var dash = shallow(
      <Dashboard
        entries={[]}
        openEntryModal={jest.fn()}
        loadEntries={jest.fn()}
        />
    )
    const customTootipTitle = dash.instance().customTootipTitle
    expect(customTootipTitle({})).toEqual({'data-tip': 'No Entries'})
    expect(customTootipTitle({date: '2017-01-01', count: 5})).toEqual({'data-tip': 'Jan 01: ⭐ ⭐ ⭐ ⭐ ⭐ '})
    expect(customTootipTitle({date: '2017-05-30', count: 1})).toEqual({'data-tip': 'May 30: ⭐ '})
  })

  it('should have link to open entry modal in empty entries message', () => {
    const openEntryModal = jest.fn()
    var dash = shallow(
      <Dashboard
        entries={[]}
        openEntryModal={openEntryModal}
        loadEntries={jest.fn()}
        />
    )
    dash.find(Message).find('a').simulate('click')
    expect(openEntryModal).toBeCalled()
  })
})
