describe('Компонент Последовательность Фибоначчи работает корректно', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci')
  })

  describe('Кнопка Рассчитать работает корректно', () => {
    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
      cy.get('input').should('have.value', '')
      cy.contains('Рассчитать').should('be.disabled')
      cy.get('input').type('4')
      cy.contains('Рассчитать').should('not.be.disabled')
      cy.get('input').clear()
      cy.contains('Рассчитать').should('be.disabled')
    })
  })

  describe('', () => {
    it('', () => {
      cy.get('input').type('5')
      cy.get('button').contains('Рассчитать').click()
      cy.get('[class*=circle_circle]')
        .should('have.length', 1)
        .each(($el, index) => {
          if (index === 0) expect($el).to.contain('1')
        })
      
      cy.wait(500)

      cy.get('[class*=circle_circle]')
      .should('have.length', 2)
      .each(($el, index) => {
        if (index === 0) expect($el).to.contain('1')
        if (index === 1) expect($el).to.contain('1')
      })

      cy.wait(500)

      cy.get('[class*=circle_circle]')
      .should('have.length', 3)
      .each(($el, index) => {
        if (index === 0) expect($el).to.contain('1')
        if (index === 1) expect($el).to.contain('1')
        if (index === 2) expect($el).to.contain('2')
      })

      cy.wait(500)

      cy.get('[class*=circle_circle]')
      .should('have.length', 4)
      .each(($el, index) => {
        if (index === 0) expect($el).to.contain('1')
        if (index === 1) expect($el).to.contain('1')
        if (index === 2) expect($el).to.contain('2')
        if (index === 3) expect($el).to.contain('3')
      })

      cy.wait(500)

      cy.get('[class*=circle_circle]')
      .should('have.length', 5)
      .each(($el, index) => {
        if (index === 0) expect($el).to.contain('1')
        if (index === 1) expect($el).to.contain('1')
        if (index === 2) expect($el).to.contain('2')
        if (index === 3) expect($el).to.contain('3')
        if (index === 4) expect($el).to.contain('5')
      })

      cy.wait(500)

      cy.get('[class*=circle_circle]')
      .should('have.length', 6)
      .each(($el, index) => {
        if (index === 0) expect($el).to.contain('1')
        if (index === 1) expect($el).to.contain('1')
        if (index === 2) expect($el).to.contain('2')
        if (index === 3) expect($el).to.contain('3')
        if (index === 4) expect($el).to.contain('5')
        if (index === 5) expect($el).to.contain('8')
      })
    })
  })
})