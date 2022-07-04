import React from "react"
import { bubbleSorting, selectionSorting } from "../sorting-page/utils"
import { ElementStates } from "../../types/element-states"

describe('Алгоритм сортировки выбором работает без ошибок', () => {
  let testArr 

  beforeEach(() => {
    testArr = [
      {
        num: -5,
        state: ElementStates.Default
      },
      {
        num: 8,
        state: ElementStates.Default
      },
      {
        num: 5,
        state: ElementStates.Default
      },
      {
        num: 25,
        state: ElementStates.Default
      }
    ]
  })

  it('Корректно сортирует пустой массив', () => {
    const resultArr = []
    expect(selectionSorting("ascending", []).resultArr).toStrictEqual(resultArr)
  })

  it('Корректно сортирует массив из одного элемента', () => {
    const resultArr = [
      {
        num: 28, 
        state: ElementStates.Modified
      }]
    expect(selectionSorting("descending", [{num: 28, state: ElementStates.Default}]).resultArr).toStrictEqual(resultArr)
  })

  it('Корректно сортирует массив из нескольких элементов по возрастанию', () => {
    const resultArr = [
      {
        num: -5,
        state: ElementStates.Modified
      },
      {
        num: 5,
        state: ElementStates.Modified
      },
      {
        num: 8,
        state: ElementStates.Modified
      },
      {
        num: 25,
        state: ElementStates.Modified
      }
    ]
    expect(selectionSorting("ascending", testArr).resultArr).toStrictEqual(resultArr)
  })

  it('Корректно сортирует массив из нескольких элементов по убыванию', () => {
    const resultArr = [
      {
        num: 25,
        state: ElementStates.Modified
      },
      {
        num: 8,
        state: ElementStates.Modified
      },
      {
        num: 5,
        state: ElementStates.Modified
      },
      {
        num: -5,
        state: ElementStates.Modified
      }
    ]
    expect(selectionSorting("descending", testArr).resultArr).toStrictEqual(resultArr)
  })

})

describe('Алгоритм сортировки пузырьком работает без ошибок', () => {
  let testArr 

  beforeEach(() => {
    testArr = [
      {
        num: -5,
        state: ElementStates.Default
      },
      {
        num: 8,
        state: ElementStates.Default
      },
      {
        num: 5,
        state: ElementStates.Default
      },
      {
        num: 25,
        state: ElementStates.Default
      }
    ]
  })


  it('Корректно сортирует пустой массив', () => {
    const resultArr = []
    expect(bubbleSorting("descending", []).resultArr).toStrictEqual(resultArr)
  })

  it('Корректно сортирует массив из одного элемента', () => {
    const resultArr = [
      {
        num: 5, 
        state: ElementStates.Modified
      }]
    expect(bubbleSorting("ascending", [{num: 5, state: ElementStates.Default}]).resultArr).toStrictEqual(resultArr)
  })

  it('Корректно сортирует массив из нескольких элементов по возрастанию', () => {
    const resultArr = [
      {
        num: -5,
        state: ElementStates.Modified
      },
      {
        num: 5,
        state: ElementStates.Modified
      },
      {
        num: 8,
        state: ElementStates.Modified
      },
      {
        num: 25,
        state: ElementStates.Modified
      }
    ]
    expect(bubbleSorting("ascending", testArr).resultArr).toStrictEqual(resultArr)
  })

  it('Корректно сортирует массив из нескольких элементов по убыванию', () => {
    const resultArr = [
      {
        num: 25,
        state: ElementStates.Modified
      },
      {
        num: 8,
        state: ElementStates.Modified
      },
      {
        num: 5,
        state: ElementStates.Modified
      },
      {
        num: -5,
        state: ElementStates.Modified
      }
    ]
    expect(bubbleSorting("descending", testArr).resultArr).toStrictEqual(resultArr)
  })
})