import React, { useEffect, useState } from "react"
import { SolutionLayout, Circle, Button, Input, ArrowIcon } from "../ui"
import style from "./style.module.css"
import { delay, getNumber } from "../../utils/utils"
import { Direction } from "../../types/direction"
import { LinkedList, ILinkedList } from "./utils"
import { ElementStates } from "../../types/element-states"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { listItemProps } from "../../types/types"

export const ListPage: React.FC = () => {
  const [ value, setValue ] = useState<string>("")
  const [ disableButton, setDisableButton ] = useState<Boolean>(false)
  const [ index, setindex ] = useState<number>()
  const [ arrCircles, setArrCircles ] = useState<listItemProps[]>([])
  const [ linkedList, setLinkedList ] = useState<ILinkedList<string>>()

  useEffect(() => {
    const randomStringsArray = Array.from({ length: 12 },() => `${getNumber()}`)
    const newLinkedList = new LinkedList<string>(randomStringsArray)
    const initRenderCircle: listItemProps[] = randomStringsArray.map((item) => {
      return {char: item, state: ElementStates.Default,}
    })
    setLinkedList(newLinkedList)
    setArrCircles(initRenderCircle.reverse())
  }, [])

  const addCircleTop = (
    arr: any,
    index: number,
    value: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: true,
      extraCircle: {
        char: value ? value : "",
      },
    }
  }

  const removeCircleTop = (arr: any, index: number) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: false,
      extraCircle: {
        char: value ? value : "",
      },
    };
  };

  const addCircleBottom = (
    arr: any,
    index: number,
    value?: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      deleting: true,
      extraCircle: {
        char: value ? value : "",
      },
    };
  };

  const copyArr = [...arrCircles];

  const addHead = async () => {
    setDisableButton(true)
    linkedList!.addHead(value);
    const currentHeadValue = linkedList!.getNodeIndex(0);

    addCircleTop(copyArr, 0, currentHeadValue);

    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);

    removeCircleTop(copyArr, 0);
    copyArr.unshift({
      char: currentHeadValue ? currentHeadValue : "",
      state: ElementStates.Modified,
    });

    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);

    copyArr[0].state = ElementStates.Default;
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    setValue("");
    setDisableButton(false)
  }

  const removeFromHead = async () => {
    setDisableButton(true)
    const deletedElement = linkedList!.deleteHead();

    addCircleBottom(copyArr, 0, deletedElement);
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    copyArr.shift();
    copyArr[0].state = ElementStates.Default;
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    setDisableButton(false)
  }

  const addTail = async () => {
    setDisableButton(true);
    linkedList!.addTail(value);
    const tailindex = linkedList!.getSize() - 1;

    const TailValue = linkedList!.getNodeIndex(tailindex);
    addCircleTop(copyArr, tailindex-1, TailValue);
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    removeCircleTop(copyArr, tailindex-1)

    copyArr[copyArr.length] = {
      ...copyArr[copyArr.length],
      char: TailValue ? TailValue : "",
      state: ElementStates.Modified,
      adding: false,
      extraCircle: undefined,
    };
    setArrCircles([...copyArr])
    await delay(SHORT_DELAY_IN_MS)

    copyArr.forEach((el) => (el.state = ElementStates.Default));
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    setValue("")
  }

  const removeFromTail = async () => {
    setDisableButton(true)
    const { length } = copyArr;
    const removeElement = linkedList!.deleteTail();
    addCircleBottom(copyArr, length - 1, removeElement);
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    copyArr.pop();
    copyArr[length - 2].state = ElementStates.Default;
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    setDisableButton(false)
  }

  const addToIndex = async (index: number) => {
    setDisableButton(true)
    const copyArr = [...arrCircles];
    linkedList!.insertPos(value, index);
    const newValue = linkedList!.getNodeIndex(index);
    for (let i = 0; i <= index!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          char: newValue ? newValue : "",
        },
      };
      if (i > 0)
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      setArrCircles([...copyArr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    copyArr[index!] = {
      ...copyArr[index!],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.splice(index!, 0, {
      char: newValue ? newValue : "",
      state: ElementStates.Modified,
    });
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);

    copyArr.forEach((el) => (el.state = ElementStates.Default));
    setValue("");
    setindex(undefined);
    setDisableButton(false)
  };

  const removeToIndex = async (index: number) => {
    setDisableButton(true)
    const deletingValue = copyArr[index!].char;
    const deletedElement = linkedList!.removePos(index);
    for (let i = 0; i <= index!; i++) {
      copyArr[i].state = ElementStates.Changing;
      if (i === index) copyArr[i].noArrow = true;
      setArrCircles([...copyArr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    addCircleBottom (copyArr, index!, deletedElement)
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
   
    copyArr.splice(index!, 1);
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    setindex(undefined);
    setArrCircles([...copyArr]);
    await delay(SHORT_DELAY_IN_MS);
    setDisableButton(false)
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={style.flexContainer}>
        <form className={style.form}>
          <Input
            name="value"
            extraClass={style.input}
            placeholder="Введите значение"
            min={1}
            value={value || ""}
            onChange={handleInput}
            isLimitText={true}
            maxLength={4}
          />
          <Button
            extraClass={style.button}
            disabled={!value || arrCircles.length > 12}
            text="Добавить в head"
            type="button"
            onClick={() => addHead()}
          />
          <Button
            extraClass={style.button}
            disabled={!value || arrCircles.length > 12}
            text="Добавить в tail"
            type="button"
            onClick={() => addTail()}
          />
          <Button
            extraClass={style.button}
            disabled={arrCircles.length <= 1}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromHead()}
          />
          <Button
            extraClass={style.button}
            disabled={arrCircles.length <= 1}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTail()}
          />
        </form>
        
        <form className={style.form}>
          <Input
            name="index"
            type="text"
            extraClass={style.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={index || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setindex(Number(e.currentTarget.value.replace(/[^0-9]/g, "")))
            }
          />
          <Button
            extraClass={style.bigButton}
            disabled={
              !value ||
              !index ||
              !!disableButton ||
              index > arrCircles.length - 1 ||
              arrCircles.length > 12
            }
            text="Добавить по индексу"
            type="button"
            onClick={() => index && addToIndex(index)}
          />
          <Button
            extraClass={style.bigButton}
            disabled={!index || index > arrCircles.length - 1}
            text="Удалить по индексу"
            type="button"
            onClick={() => index && removeToIndex(index)}
          />
        </form>
        
      </div>
      <ul className={style.circleList}>
        {arrCircles.map((char, index) => {
          return (
            <div className={style.block} key={index}>
              <Circle
                state={char.state}
                letter={char.char}
                index={index}
                head={index === 0 && !char.adding && !char.deleting ? "head" : ""}
                tail={
                  index === arrCircles.length - 1 &&
                  !char.adding &&
                  !char.deleting
                    ? "tail"
                    : ""
                }
              />
              {index !== arrCircles.length - 1 && (
                <ArrowIcon
                  fill={
                    char.state === ElementStates.Changing && !char.noArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
              {char.adding && (
                <Circle
                  extraClass={style.upperCircle}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
              {char.deleting && (
                <Circle
                  extraClass={style.lowerCircle}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
