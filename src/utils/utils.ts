import { columnObject, listItemProps } from "../types/types"

export const swap = (arr: columnObject[] | listItemProps[] | string[] | number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex]
  arr[firstIndex] = arr[secondIndex]
  arr[secondIndex] = temp
}

export const delay = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getNumber = () => Math.floor(Math.random() * 100) + 1