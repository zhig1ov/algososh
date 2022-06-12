import React, { useEffect, useState } from "react";
import { SolutionLayout, Input, Button, Circle, RadioInput } from "../ui"
import style from "./style.module.css"
import { delay } from "../../utils/utils"
import { Direction } from "../../types/direction"

export const SortingPage: React.FC = () => {



  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.flexContainer}>
        <div className={style.radioContainer}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={style.buttonsContainer}>
          <Button text="По возрастанию" sorting={Direction.Ascending} type="button" linkedList="big" />
          <Button text="По убыванию" sorting={Direction.Descending} type="button" linkedList="big" />
        </div>
          <Button text="Новый массив" linkedList="small" />
      </div>
    </SolutionLayout>
  );
};
