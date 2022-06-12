import React, { useEffect, useState } from "react";
import { SolutionLayout, Column, Button, RadioInput } from "../ui"
import style from "./style.module.css"
import { delay, getNumber } from "../../utils/utils"
import { Direction } from "../../types/direction"
import { columnObject } from "./utils"
import { selectionSorting, bubbleSorting } from "./utils"
import { ElementStates } from "../../types/element-states"

type radioState = "selection" | "bubble"

export const SortingPage: React.FC = () => {
  const [arraySort, setArraySort] = useState<columnObject[]>([])
  const [checked, setChecked] = useState<radioState>("selection")
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)
  const [ascending, setAscending] = useState(false)
  const [descending, setDescending] = useState(false)

  useEffect(() => {
    createArray();
  }, []);

  const createArray = () => {
    const size = Math.random() * (17 - 3) + 3;
    const arr: columnObject[] = Array.from({ length: size }, () => ({
      num: getNumber(),
      state: ElementStates.Default,
    }));
    setArraySort([...arr]);
  };
  console.log(arraySort)

  const sort = async (arr: columnObject[]) => {
    setArraySort([...arr]);
    await delay(500);
  };

  const bubbleSort = async (mode: "ascending" | "descending") => {

    setDisableButton(true)
    mode === "ascending" ? setAscending(true) : setDescending(true)

    const arr = [...arraySort]
    arr.forEach((el) => (el.state = ElementStates.Default));

    let stepCounter = 1
    while (stepCounter !== bubbleSorting(mode, arr).numberOfSteps) {
      await sort(bubbleSorting(mode, arr, stepCounter).resultArr)
      stepCounter++
    }
    setDisableButton(false)
    mode === "ascending" ? setAscending(false) : setDescending(false)
  }

  const selectionSort = async (mode: "ascending" | "descending") => {

    setDisableButton(true);
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

  const renderSort = (column: columnObject, index: number) => {
    return (
        <Column index={column.num} state={column.state} key={index} />
    )
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div>
        <div className={style.flexContainer}>
          <div className={style.radioContainer}>
            <RadioInput               
              disabled={!!disableButton}
              checked={checked === "selection"}
              onChange={() => setChecked("selection")}
              value="selection"
              label="Выбор" />
            <RadioInput 
              label="Пузырёк"              
              disabled={!!disableButton}
              checked={checked === "bubble"}
              onChange={() => setChecked("bubble")}
              value="bubble"
            />
          </div>
          <div className={style.buttonsContainer}>
            <Button 
              text="По возрастанию" 
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
              text="По убыванию" 
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
              text="Новый массив" 
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
  );
};
