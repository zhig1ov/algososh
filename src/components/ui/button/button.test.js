import React from "react"
import renderer from "react-test-renderer"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "./button"

describe('Работа компонента button', () => {
	it('Кнопка с текстом рендерится без ошибок', () => {
    const tree = renderer
			.create(<Button text='Нажми меня!'/>)
			.toJSON()
		expect(tree).toMatchSnapshot()            
    })

		it('Кнопка без текста рендерится без ошибок', () => {
			const tree = renderer
				.create(<Button />)
				.toJSON()
			expect(tree).toMatchSnapshot()
		})

		it('Заблокированная кнопка рендерится без ошибок', () => {
			const tree = renderer
				.create(<Button disabled={true} />)
				.toJSON()
			expect(tree).toMatchSnapshot()
		})
		
		it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
			const tree = renderer	
				.create(<Button isLoader={true} />)
				.toJSON()
			expect(tree).toMatchSnapshot()
		})

		it('Коллбэк кнопки работает корректно', () => {
			window.alert = jest.fn()
			render(<Button text='Жмякни меня!' onClick={alert('Booms')} />)
			const button = screen.getByText('Жмякни меня!')
			fireEvent.click(button)
			expect(window.alert).toHaveBeenCalledWith('Booms')
		})
})