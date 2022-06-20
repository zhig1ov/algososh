import React, { ChangeEvent, SyntheticEvent, useState } from "react"
import { SolutionLayout, Button, Input, Circle } from "../ui"
import style from "./style.module.css"
import { Stack, IStack } from "./utils"
import { delay } from "../../utils/utils"
import { columnObject } from "../../types/types"
import { ElementStates } from "../../types/element-states"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"

const stackInst = new Stack<string>()

export interface IStackObject {
  char?: string | null
  state: ElementStates
  head?: "top"
}

export const StackPage: React.FC = () => {
  const [ inputValue, setInputValue ] = useState<string>("")
  const [ stack, setStack ] = useState<IStack<string>>(stackInst)
  const [ renderValues, setRenderValues ] = useState<Array<IStackObject>>([])
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)

  const push = async () => {
    setDisableButton(true)
    stack.push(inputValue)
    const newElement = stack.peak()
    renderValues.push({
      char: newElement,
      state: ElementStates.Changing,
      head: "top",
    });
    setRenderValues([...renderValues])
    await delay(SHORT_DELAY_IN_MS)
    renderValues[renderValues.length - 1].state = ElementStates.Default
    setRenderValues([...renderValues])
    resetInput()
    setDisableButton(false)
  }

  const pop = async () => {
    setDisableButton(true)
    stack!.pop()
    const size = stack.getSize()
    if (size !== 0) {
      renderValues[renderValues.length - 1].state = ElementStates.Changing
      renderValues[renderValues.length - 1].head = "top"
      setRenderValues([...renderValues])
      renderValues.pop()
      await delay(SHORT_DELAY_IN_MS)
      setRenderValues([...renderValues])
    } else {
      setRenderValues([])

    }
    setDisableButton(false)
  }

  const resetInput = () => {
    setInputValue("")
  }

  const clearStack = () => {
    setRenderValues([])
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <SolutionLayout title="Стек">
      <form className={style.form}>
        <Input placeholder = "Введите текст" type="text" maxLength={4} onChange={handleChange} isLimitText={true} value = {inputValue}/>
        <Button type="button" text="Добавить" disabled={inputValue.length === 0 || !!disableButton} onClick={push}/>
        <Button type="button" text="Удалить" disabled={!!disableButton} onClick={pop}/>
        <Button extraClass={style.clearButton} type="reset" text="Очистить" disabled={!!disableButton} onClick={clearStack}/>
      </form>
      <ul className={style.circleList}>
      {renderValues &&
            renderValues.map((item, index) => (
              <li className={style.listEl} key={index}>
                {index === renderValues.length - 1 && (
                  <p className={style.listElInfo}>top</p>
                )}
                <Circle letter={item.char} state={item.state} />
                <p className={style.listElInfo}>{index}</p>
              </li>
            ))}
      </ul>
    </SolutionLayout>
  )
}
