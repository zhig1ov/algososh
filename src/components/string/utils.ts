import { swap } from "../../utils/utils"

export const swapString = (
  string: string,
  step?: number
): { resultArray: string[]; numberSteps: number } => {
  let stepCounter = 0
  const arrChars: string[] = []
  string.split("").forEach((el) => arrChars.push(el))
  let startIndex = 0
  let endIndex = arrChars.length - 1
  while (endIndex >= startIndex) {
    if (step && step === stepCounter) break
    swap(arrChars, startIndex, endIndex)
    startIndex++
    endIndex--
    stepCounter++
  }
  return { resultArray: arrChars, numberSteps: stepCounter }
}