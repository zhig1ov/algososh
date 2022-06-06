export const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const delay = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}