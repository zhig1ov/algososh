import React, { SyntheticEvent, useEffect, useState } from "react"
import { SolutionLayout, Input, Button, Circle } from "../ui"
import { ElementStates } from "../../types/element-states"
import { swapString } from "./utils"
import { listItemProps } from "../../types/types"
import style from "./style.module.css"
import { delay } from "../../utils/utils"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"

export const StringComponent: React.FC = () => {
  const [ inputString, setInputString ] = useState<string>("")
  const [ sortString, setSortString ] = useState<listItemProps[]>([])
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)

  useEffect(() => {
    inputString.length > 1 && inputString.length < 12 ? setDisableButton(false) : setDisableButton(true)
  },[inputString])
  
  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInputString(e.currentTarget.value)
  }

  const createCircle = async () => {
    setInputString("")

    setDisableButton(true)

    const arrChars: listItemProps[] = []
    inputString.split("").forEach((el) => {
      arrChars.push({ char: el, state: ElementStates.Default })
    })
    setSortString([...arrChars])
    await delay(SHORT_DELAY_IN_MS)

    const numberSteps: number = swapString(inputString).numberSteps

    let step = 0
    while (step !== numberSteps) {

      arrChars[step].state = ElementStates.Changing
      arrChars[inputString.length - (step + 1)].state = ElementStates.Changing
      setSortString([...arrChars])
      await delay(SHORT_DELAY_IN_MS)

      swapString(inputString, step + 1).resultArray.forEach((el, idx) => {
        arrChars[idx].char = el
      })

      arrChars[step].state = ElementStates.Modified;
      arrChars[inputString.length - (step + 1)].state = ElementStates.Modified;
      setSortString([...arrChars])
      await delay(SHORT_DELAY_IN_MS)

      step++
    }
    setDisableButton(false)
  }

  const renderSymbols= (data: listItemProps, index: number) => {
    return (
      <li className={`${style['list-item']}`} key={index}>
        <Circle
          key={index}
          letter={data.char}
          state={data.state}
        />
      </li>
    )
  }

  return (
    <SolutionLayout title="Строка">
      <form className={style.form}>
        <Input extraClass={style.input} type='text' max={11} maxLength={11} isLimitText={true} placeholder = "Введите текст" onChange={handleInput}/>
        <Button linkedList="small" text='Рассчитать' disabled={inputString.length === 0 || !!disableButton} onClick={createCircle} type="submit"/>
      </form>
      <div className={style.symbolContainer}>
        <ul className={style.ul}>
          {sortString.map((data, index) => {
            return (
            renderSymbols(data, index)
          )
          })}
        </ul>
      </div>
    </SolutionLayout>
  )
}
