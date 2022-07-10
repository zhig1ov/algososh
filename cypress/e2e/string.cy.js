describe('Компонент строка работатает корректно', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  describe('Кнопка Развернуть работает корректно', () => {

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
      cy.get('input').should('have.value', '')
      cy.contains('Развернуть').should('be.disabled')
      cy.get('input').type('algososh')
      cy.contains('Развернуть').should('not.be.disabled')
      cy.get('input').clear()
      cy.contains('Развернуть').should('be.disabled')
    })
  })

  describe('Cтрока разворачивается корректно', () => {
    it('Разворот строки и анимация работает корректно', () => {
      cy.get('input').type('world')
      cy.get('button').contains('Развернуть').click()
      cy.get('[class*=circle_circle]')
        .should('have.length', 5)
        .each(($el, index) => {
          if (index === 0) expect($el).to.contain('w')
          if (index === 1) expect($el).to.contain('o')
          if (index === 2) expect($el).to.contain('r')
          if (index === 3) expect($el).to.contain('l')
          if (index === 4) expect($el).to.contain('d')

          if (index === 0 || index === 4) {
            cy.wrap($el).should(
              'have.css',
              'border',
              '4px solid rgb(210, 82, 225)'
            )

          if (index === 0) expect($el).to.contain('w')
          if (index === 4) expect($el).to.contain('d')
          }
        })

        cy.wait(500)
      
        cy.get('[class*=circle_circle]').each(($el, index) => {
          if (index === 0 || index === 4) {
            cy.wrap($el).should(
              'have.css',
              'border',
              '4px solid rgb(127, 224, 81)'
            )
            
            if (index === 0) expect($el).to.contain('d')
            if (index === 4) expect($el).to.contain('w')
          }
        })

        cy.wait(500)

        cy.get('[class*=circle_circle]').each(($el, index) => {
          if (index === 1 || index === 3) {
            cy.wrap($el).should(
              'have.css',
              'border',
              '4px solid rgb(210, 82, 225)'
            )
            
            if (index === 1) expect($el).to.contain('o')
            if (index === 3) expect($el).to.contain('l')
          }
        })

        cy.wait(500)

        cy.get('[class*=circle_circle]').each(($el, index) => {
          if (index === 1 || index === 3) {
            cy.wrap($el).should(
              'have.css',
              'border',
              '4px solid rgb(127, 224, 81)'
            )
            
            if (index === 1) expect($el).to.contain('l')
            if (index === 3) expect($el).to.contain('o')
          }
        })

        cy.wait(500)

        cy.get('[class*=circle_circle]').each(($el, index) => {
          if (index === 2) {
            cy.wrap($el).should(
              'have.css',
              'border',
              '4px solid rgb(127, 224, 81)'
            )  
            expect($el).to.contain('r')
          }
        })

        cy.wait(500)

        cy.get('[class*=circle_circle]').each(($el, index) => {
          if (index === 2) {
            cy.wrap($el).should(
              'have.css',
              'border',
              '4px solid rgb(127, 224, 81)'
            )
            expect($el).to.contain('r')
          }
        })
    })
  })
})

