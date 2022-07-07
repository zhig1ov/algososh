describe('Сервер доступен', () => {
  it('Заходить на localhost:3000', () => {
    cy.visit('http://localhost:3000')
  })
})