import { swap } from "../../utils/utils"
import { IArraySymbol } from "./string"

export const reverseStringAlgo = async (arr: IArraySymbol[], callback: any, change: string, modified: string) => {
  let start = 0
  let end = arr.length - 1

  if (!arr) return

  while (start <= end) {
    await callback(arr, change, start, end)
    swap(arr, start, end)
    await callback(arr, modified, start, end)
    start++
    end--
  }

  return arr
}