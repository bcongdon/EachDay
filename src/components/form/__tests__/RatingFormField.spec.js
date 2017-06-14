import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Rating } from 'semantic-ui-react'
import RatingFormField from '../RatingFormField'

describe('RatingFormField component', () => {
  it('should render without rating if none provided', () => {
    var rating = mount(
      <RatingFormField
        clearable
        input={{value: null}}
        />
    )
    expect(rating.find(Rating).props().maxRating).toBe(5)
    expect(toJson(rating)).toMatchSnapshot()
  })

  it('should render if initial rating provided', () => {
    var rating = mount(
      <RatingFormField
        clearable
        input={{value: 3}}
        />
    )
    expect(rating.find(Rating.Icon).findWhere((n) => n.props().active).length).toBe(3)
    expect(toJson(rating)).toMatchSnapshot()
  })

  it('should handle onClick/handleChange correctly', () => {
    const onChange = jest.fn()
    var rating = mount(
      <RatingFormField
        clearable
        input={{value: 3, onChange}}
        />
    )
    rating.find(Rating.Icon).last().simulate('click')
    expect(onChange).toBeCalled()
    expect(onChange.mock.calls[0][0]).toBe(5)

    rating.setProps({input: {value: 5}})
    expect(rating.find(Rating.Icon).findWhere((n) => n.props().active).length).toBe(5)
    expect(toJson(rating)).toMatchSnapshot()
  })
})
