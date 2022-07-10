import { columnObject } from "../types/types"
import { IArraySymbol } from "../components/string/string"

export const swap = (arr: IArraySymbol[]| columnObject[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const delay = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getNumber = () => Math.floor(Math.random() * 100) + 1