import React, { useEffect, useState } from "react"
import { SolutionLayout, Column, Button, RadioInput } from "../ui"
import style from "./style.module.css"
import { delay, getNumber } from "../../utils/utils"
import { Direction } from "../../types/direction"
import { columnObject } from "../../types/types"
import { selectionSorting, bubbleSorting } from "./utils"
import { ElementStates } from "../../types/element-states"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { radioState } from "../../types/types"


export const SortingPage: React.FC = () => {
  const [ arraySort, setArraySort ] = useState<columnObject[]>([])
  const [ checked, setChecked ] = useState<radioState>("selection")
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)
  const [ ascending, setAscending ] = useState(false)
  const [ descending, setDescending] = useState(false)

  useEffect(() => {
    createArray()
  }, [])

  const createArray = () => {
    const size = Math.random() * (17 - 3) + 3
    const arr: columnObject[] = Array.from({ length: size }, () => ({
      num: getNumber(),
      state: ElementStates.Default,
    }))
    setArraySort([...arr])
  }

  const sort = async (arr: columnObject[]) => {
    setArraySort([...arr])
    await delay(SHORT_DELAY_IN_MS)
  }

  const bubbleSort = async (mode: "ascending" | "descending") => {

    setDisableButton(true)
    mode === "ascending" ? setAscending(true) : setDescending(true)

    const arr = [...arraySort]
    arr.forEach((el) => (el.state = ElementStates.Default))

    let stepCounter = 1
    while (stepCounter !== bubbleSorting(mode, arr).numberOfSteps) {
      await sort(bubbleSorting(mode, arr, stepCounter).resultArr)
      stepCounter++
    }
    setDisableButton(false)
    mode === "ascending" ? setAscending(false) : setDescending(false)
  }

  const selectionSort = async (mode: "ascending" | "descending") => {

    setDisableButton(true)
    mode === "ascending" ? setAscending(true) : setDescending(true)

    const arr = [...arraySort]

    let stepCounter = 1
    while (stepCounter !== selectionSorting(mode, arr).numberOfSteps) {
      await sort(selectionSorting(mode, arr, stepCounter).resultArr)
      stepCounter++
    }
    setDisableButton(false)
    mode === "ascending"? setAscending(false) : setDescending(false)
  }

  return (
    <SolutionLayout title="???????????????????? ??????????????">
      <div>
        <div className={style.flexContainer}>
          <div className={style.radioContainer}>
            <RadioInput               
              disabled={!!disableButton}
              checked={checked === "selection"}
              onChange={() => setChecked("selection")}
              value="selection"
              label="??????????" />
            <RadioInput 
              label="??????????????"              
              disabled={!!disableButton}
              checked={checked === "bubble"}
              onChange={() => setChecked("bubble")}
              value="bubble"
            />
          </div>
          <div className={style.buttonsContainer}>
            <Button 
              text="???? ??????????????????????" 
              sorting={Direction.Ascending}
              isLoader={ascending} 
              type="button" 
              linkedList="big" 
              onClick={() =>
                checked === "selection"
                  ? selectionSort("ascending")
                  : bubbleSort("ascending")
              }
              />
            <Button 
              text="???? ????????????????" 
              sorting={Direction.Descending} 
              isLoader={descending}
              type="button" 
              linkedList="big" 
              onClick={() =>
                checked === "selection"
                  ? selectionSort("descending")
                  : bubbleSort("descending")
              }/>
          </div>
            <Button 
              isLoader={false}
              type="submit"
              text="?????????? ????????????" 
              linkedList="small" 
              onClick={createArray} 
            />
        </div>
        <ul className={style.columnList}>
        {arraySort.map((column, i) => {
            return <Column index={column.num} state={column.state} key={i} />
          })}
        </ul>
      </div>
    </SolutionLayout>
  )
}