describe('Роутинг работает корректно', () => {
  it('Роут на страницу Cтрока работает', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href*="/recursion"]').click()
    cy.get('button').contains('К оглавлению').click()
  })

  it('Роут на страницу Фибоначчи работает', () => {
    cy.get('a[href*="/fibonacci"]').click()
    cy.get('button').contains('К оглавлению').click()
  })

  it('Роут на страницу Сортировка массива работает', () => {
    cy.get('a[href*="/sorting"]').click()
    cy.get('button').contains('К оглавлению').click()
  })

  it('Роут на страницу Стек работает', () => {
    cy.get('a[href*="/stack"]').click()
    cy.get('button').contains('К оглавлению').click()
  })

  it('Роут на страницу Очередь работает', () => {
    cy.get('a[href*="/queue"]').click()
    cy.get('button').contains('К оглавлению').click()
  })

  it('Роут на страницу Связный список работает', () => {
    cy.get('a[href*="/list"]').click()
    cy.get('button').contains('К оглавлению').click()
  })
})