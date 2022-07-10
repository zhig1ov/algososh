import React, { ChangeEvent, useState } from "react"
import { SolutionLayout, Input, Button, Circle } from "../ui"
import { ElementStates } from "../../types/element-states"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { reverseStringAlgo } from "./utils"
import style from "./style.module.css"
import { delay } from "../../utils/utils"

export interface IArraySymbol {
  symbol: string
  state: ElementStates
}

export const StringComponent: React.FC = () => {

  const [sortString, setSortString] = useState<IArraySymbol[]>([])
  const [disableButton, setDisableButton] = useState(false)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSortString(e.target.value.split('').map((symbol: string) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    }))
  }

  const changeStateRender = async (arr: IArraySymbol[], status: ElementStates, startIndex: number, endIndex: number) => {
    changeState(arr, status, startIndex, endIndex)
    setSortString([...arr])
    await delay(SHORT_DELAY_IN_MS)
  }

  const changeState = (arr: IArraySymbol[], status: ElementStates, start: number, end: number) => {
    arr[start].state = status
    
    if(end) {
      arr[end].state = status
    }
  }

  const reverseString = async () => {
    setDisableButton(true)
    await reverseStringAlgo(sortString, changeStateRender, ElementStates.Changing, ElementStates.Modified)
    setDisableButton(false)
  }

  const renderSymbols= (data: IArraySymbol, index: number) => {
    return (
      <li className={`${style['list-item']}`} key={index}>
        <Circle
          key={index}
          letter={data.symbol}
          state={data.state}
        />
      </li>
    )
  }

  return (
    <SolutionLayout title="Строка">
        <form className={`${style.form}`}>
          <Input 
            onChange={handleInput} 
            extraClass={`${style.input} mr-6`} 
            isLimitText={true} 
            maxLength={11}
          />
          <Button 
            text="Развернуть"
            onClick={reverseString}
            isLoader={disableButton}
            disabled={sortString.length ? false : true}
          />
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
