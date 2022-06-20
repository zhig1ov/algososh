import React, { useEffect, useState } from "react"
import { SolutionLayout, Input, Button, Circle } from "../ui"
import style from "./style.module.css"
import { delay } from "../../utils/utils"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { fib } from "./utils"

export const FibonacciPage: React.FC = () => {
  const [ inputNumber, setInputNumber ] = useState<number>(0)
  const [ fibNumber, setFibNumber ] = useState<Array<number>>([])
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)
  const [ inProgress, setInProgress ] = useState<Boolean>(false)

  const maxNumber = 19
  const minNumber = 1

  useEffect(() => {
    inputNumber > maxNumber || inputNumber < minNumber ? setDisableButton(true) : setDisableButton(false)
  },[inputNumber])
 
  //Расчет ряда Фибоначчи исходя из данных инпута
  const getFibonacciNumbers = async () => {
    setInProgress(true)
    const arr = []
    for (let i = 1; i <= inputNumber + 1; i++) {
      await delay(SHORT_DELAY_IN_MS)
      arr.push(fib(i))
      setFibNumber([...arr])
    }
    setInProgress(false)  
  }

  //Рендер ряда Фибоначчи
  const renderFibNumber = (number: number, index: number) => {
    return (
      <li className={`${style['list-item']}`} key={index}>
        <Circle letter={`${number}`}/>
        <p>{index}</p>
      </li>
    )
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputNumber(+e.currentTarget.value)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">   
      <form className={style.form}>
        <Input 
          extraClass={style.input} 
          type='number' 
          max={19} 
          isLimitText={true} 
          placeholder = "Введите число" 
          onChange={handleInput}
        />
        <Button linkedList="small" text='Рассчитать' isLoader={!!inProgress} onClick={getFibonacciNumbers}  
          disabled={inputNumber === 0 || !!disableButton} type="submit"/>
      </form>
      <div className={style.numberContainer}>
        <ul className={style.ul}>
          {fibNumber && fibNumber.map((number, index) => 
            renderFibNumber(number, index)
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};