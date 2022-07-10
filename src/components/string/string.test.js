import { reverseStringAlgo } from "./utils"

describe("Тест алгоритма разворота строки", () => {
  it("Разворот строки с чётным количеством символов", async () => {
    const alg = await reverseStringAlgo(['a', 'l', 'g', 'o'], ()=>{})
    expect(alg).toEqual(['o', 'g', 'l', 'a'])
  })
    
  it("Разворот строки с  нечётным количеством символов", async () => {
    const alg = await reverseStringAlgo(['w', 'o', 'r', 'l', 'd'], ()=>{})
    expect(alg).toEqual(['d', 'l', 'r', 'o', 'w'])
  })
   
  it("Разворот строки с одним символом", async () => {
    const alg = await reverseStringAlgo(['a'], ()=>{})
    expect(alg).toEqual(['a'])
  })
    
  it("Разворот пустой строки", async () => {
    const alg = await reverseStringAlgo([''], ()=>{})
    expect(alg).toEqual([''])
  })
})