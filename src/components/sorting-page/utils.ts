import { swap } from "../../utils/utils"
import { ElementStates } from "../../types/element-states"
import { columnObject } from "../../types/types"

export const selectionSorting = (mode: "ascending" | "descending", arrayToSort: columnObject[], step?: number): { 
	resultArr: columnObject[]; numberOfSteps: number } => {
  const arr = [...arrayToSort]
  arr.forEach((el) => (el.state = ElementStates.Default));
  const { length } = arr
  let currentStep = 0
  for (let i = 0; i < length; i++) {
    let swapInd = i
    arr[i].state = ElementStates.Chosen
    currentStep++
    if (step && step === currentStep)
      return { resultArr: arr, numberOfSteps: currentStep }
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing
      currentStep++
      if (step && step === currentStep)
        return { resultArr: arr, numberOfSteps: currentStep }
      if (
        (mode === "ascending" ? arr[swapInd].num : arr[j].num) >
        (mode === "ascending" ? arr[j].num : arr[swapInd].num)
      ) {
        arr[j].state = ElementStates.Chosen
        arr[swapInd].state =
          i === swapInd ? ElementStates.Chosen : ElementStates.Default
        swapInd = j

        currentStep++
        if (step && step === currentStep)
          return { resultArr: arr, numberOfSteps: currentStep }
      }
      if (j !== swapInd) arr[j].state = ElementStates.Default
    }
    if (i === swapInd) {
      arr[i].state = ElementStates.Modified
      currentStep++
      if (step && step === currentStep)
        return { resultArr: arr, numberOfSteps: currentStep }
    }
    else {
      swap(arr, i, swapInd)
      arr[i].state = ElementStates.Modified
      currentStep++
      if (step && step === currentStep)
        return { resultArr: arr, numberOfSteps: currentStep }

      arr[swapInd].state = ElementStates.Default
      currentStep++
      if (step && step === currentStep)
        return { resultArr: arr, numberOfSteps: currentStep }
    }
  }
  return { resultArr: arr, numberOfSteps: currentStep }
}

export const bubbleSorting = (mode: "ascending" | "descending",arrayToSort: columnObject[],step?: number): { 
	resultArr: columnObject[]; numberOfSteps: number } => {
  const arr = [...arrayToSort]
  arr.forEach((el) => (el.state = ElementStates.Default))
  const { length } = arr
  let currentStep = 0
  let swapped: boolean
  do {
    swapped = false
    for (let i = 0; i < length - 1; i++) {
      arr[i].state = ElementStates.Changing
      arr[i + 1].state = ElementStates.Changing
      currentStep++
      if (step && step === currentStep)
        return { resultArr: arr, numberOfSteps: currentStep }
      if (
        (mode === "ascending" ? arr[i].num : arr[i + 1].num) >
        (mode === "ascending" ? arr[i + 1].num : arr[i].num)
      ) {
        arr[i].state = ElementStates.Chosen
        arr[i + 1].state = ElementStates.Chosen
        currentStep++
        if (step && step === currentStep)
          return { resultArr: arr, numberOfSteps: currentStep }
        swap(arr, i, i + 1)
        arr[i].state = ElementStates.Chosen
        arr[i + 1].state = ElementStates.Chosen
        currentStep++
        if (step && step === currentStep)
          return { resultArr: arr, numberOfSteps: currentStep }
        swapped = true
      }
      arr[i].state = ElementStates.Default
      arr[i + 1].state = ElementStates.Default
    }
  } while (swapped)
  arr.forEach((el) => (el.state = ElementStates.Modified))
  return { resultArr: arr, numberOfSteps: currentStep }
}
