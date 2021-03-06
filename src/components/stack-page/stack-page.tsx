import React, { ChangeEvent, SyntheticEvent, useState } from "react"
import { SolutionLayout, Button, Input, Circle } from "../ui"
import style from "./style.module.css"
import { Stack, IStack } from "./utils"
import { delay } from "../../utils/utils"
import { columnObject } from "../../types/types"
import { ElementStates } from "../../types/element-states"
import { SHORT_DELAY_IN_MS , DELAY_IN_MS} from "../../constants/delays"

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
    resetInput()
    stack.push(inputValue)
    renderValues.forEach((el) => {
      el.state = ElementStates.Default;
      el.head = undefined;
    })
    const newElement = stack!.peak()
    renderValues.push({
      char: newElement ? newElement : "",
      state: ElementStates.Default, 
    })
    setRenderValues([...renderValues])
    await delay(SHORT_DELAY_IN_MS)
    renderValues[renderValues.length-1].head = "top"
    renderValues[renderValues.length - 1].state = ElementStates.Changing
    setRenderValues([...renderValues])
    await delay(SHORT_DELAY_IN_MS)
    setDisableButton(false)
  }

  const pop = async () => {
    setDisableButton(true)
    stack!.pop()
    const size = stack.getSize()
    if (size !== 0) {
      renderValues.pop()
      setRenderValues([...renderValues])
      await delay(SHORT_DELAY_IN_MS)
      renderValues[renderValues.length - 1].state = ElementStates.Changing
      renderValues[renderValues.length - 1].head = "top"
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
    <SolutionLayout title="????????">
      <form className={style.form}>
        <Input placeholder = "?????????????? ??????????" type="text" maxLength={4} onChange={handleChange} isLimitText={true} value = {inputValue}/>
        <Button type="button" text="????????????????" disabled={inputValue.length === 0 || !!disableButton} onClick={push}/>
        <Button type="button" text="??????????????" disabled={renderValues.length === 0 || !!disableButton} onClick={pop}/>
        <Button extraClass={style.clearButton} type="reset" text="????????????????" disabled={renderValues.length === 0 || !!disableButton} onClick={clearStack}/>
      </form>
      <ul className={style.circleList}>
      {renderValues &&
            renderValues.map((item, index) => (
              <Circle 
              state={item.state}
              letter={item.char}
              index={index}
              key={index}
              head={item.head}
              />
            ))}
      </ul>
    </SolutionLayout>
  )
}
