import React, { SyntheticEvent, useState } from "react";
import { SolutionLayout, Input, Button, Circle } from "../ui"
import { ElementStates } from "../../types/element-states"
import style from "./style.module.css"

interface IArraySymbol {
  symbol: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [ inputString, setInputString ] = useState<string>("")
  const [ sortString, setSortString ] = useState<IArraySymbol[]>([])
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)
  
  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInputString(e.currentTarget.value)
  }

  const createCircle = () => {
    const symbol = inputString.split("").map(
      (symbol, i, arr) =>({ 
        symbol,
        state:
          i === 0 || i === arr.length - 1
          ? ElementStates.Changing
          : ElementStates.Default
      }))
      setSortString(symbol)
      reverseSymbol(symbol)
  }

  const reverseSymbol = (symbol: IArraySymbol[]) => {
    setDisableButton(true)
    let counter = 0
    let copySymbol = [...symbol]

    const interval = setInterval(() => {
      const first = counter;
      const last = symbol.length - 1 - first;

      if (last - 1 === first || last - 2 === first) {
        clearInterval(interval);
        setDisableButton(false);
      }

      copySymbol[first + 1] = { ...copySymbol[first + 1], state: ElementStates.Changing };
      copySymbol[last - 1] = { ...copySymbol[last - 1], state: ElementStates.Changing };

      copySymbol[first] = { ...symbol[last], state: ElementStates.Modified };
      copySymbol[last] = { ...symbol[first], state: ElementStates.Modified };

      if (last - 2 === first) {
        copySymbol[last - 1] = { ...copySymbol[last - 1], state: ElementStates.Modified };
      }

      setSortString([...copySymbol]);
      counter++;
    }, 1000);
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
      <form className={style.form}>
        <Input extraClass={style.input} type='string' max={11} isLimitText={true} placeholder = "Введите текст" onChange={handleInput}/>
        <Button linkedList="small" text='Рассчитать' isLoader={!!disableButton} onClick={createCircle} type="submit"/>
      </form>
      <div className={style.symbolContainer}>
        <ul className={style.ul}>
          {sortString.map((data, index) => {
            return (
            renderSymbols(data, index)
          );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
