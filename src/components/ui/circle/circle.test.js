import React from "react"
import renderer from "react-test-renderer"
import { Circle } from "./circle"
import { ElementStates } from "../../../types/element-states"

describe('Работы компонента Circle', () => {
  it('Circle без буквы работает без ошибок', () => {
    const tree = renderer
			.create(<Circle  />)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

  it('Circle с буквой работает без ошибок', () => {
		const tree = renderer
			.create(<Circle letter='ABCD'/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

  it('Circle с head работает без ошибок', () => {
		const tree = renderer
			.create(<Circle head='string'/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle с react элементом в head работает без ошибок', () => {
		const tree = renderer
			.create(<Circle head={<Circle />}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle с tail работает без ошибок', () => {
		const tree = renderer
			.create(<Circle tail='string'/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle с react элементом в tail работает без ошибок', () => {
		const tree = renderer
			.create(<Circle tail={<Circle />}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle с index работает без ошибок', () => {
		const tree = renderer
			.create(<Circle index={5}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle с пропом isSmall работает без ошибок', () => {
		const tree = renderer
			.create(<Circle isSmall={true}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle в состоянии default работает без ошибок', () => {
		const tree = renderer
			.create(<Circle state={ElementStates.Default}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle в состоянии changing работает без ошибок', () => {
		const tree = renderer
			.create(<Circle state={ElementStates.Changing}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })

	it('Circle в состоянии modified работает без ошибок', () => {
		const tree = renderer
			.create(<Circle state={ElementStates.Modified}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
  })
})