import React, { useEffect, useState } from "react";
import { SolutionLayout, Input, Button, Circle } from "../ui"
import style from "./style.module.css"
import { delay } from "../../utils/utils"

export const FibonacciPage: React.FC = () => {
  const [ inputNumber, setInputNumber ] = useState<number>(0)
  const [ fibNumber, setFibNumber ] = useState<Array<number>>([])
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)

  useEffect(() => {
    inputNumber > 19 || inputNumber < 1 ? setDisableButton(true) : setDisableButton(false)
  },[inputNumber])
 
  //Функция Фиббоначи
  const fib = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
  };

  //Расчет ряда Фибоначчи исходя из данных инпута
  const sumbitFib = async () => {
    setDisableButton(true)
    const arr = []
    for (let i = 0; i <= inputNumber + 1; i++) {
      await delay(500)
      arr.push(fib(i))
      setFibNumber([...arr])
    }
    setDisableButton(false)  
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

  return (
    <SolutionLayout title="Последовательность Фибоначчи">   
      <form className={style.form}>
        <Input extraClass={style.input} type='number' max={19} isLimitText={true} placeholder = "Введите число" onChange={(e: any) => setInputNumber(+e.target.value)}/>
        <Button linkedList="small" text='Рассчитать' disabled={!!disableButton} onClick={sumbitFib}/>
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