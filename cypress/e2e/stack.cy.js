describe('Стек работает корректно', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack')
  })

  it('Кнопки работают корректно', () => {
    cy.get('input').should('have.value', '')
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
    cy.get('input').type('algo')
    cy.contains('Добавить').should('not.be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
    cy.get('input').clear()
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
    cy.get('input').type('algo')
    cy.contains('Добавить').click()
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('not.be.disabled')
    cy.contains('Очистить').should('not.be.disabled')
    cy.get('input').type('algo')
    cy.contains('Добавить').should('not.be.disabled')
    cy.contains('Удалить').should('not.be.disabled')
    cy.contains('Очистить').should('not.be.disabled')
    cy.get('input').clear()
    cy.contains('Очистить').click()
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
  })

  describe('Стек отрабатывает корректно', () => {
    it('Корректно добавляются элементы в стек', () => {
      cy.get('input').type('algo')
      cy.contains('Добавить').click()
      cy.get('[class*=circle_content]')
        .should('have.length', 1)
        .each(($el, index) => {
          expect($el).to.contain('algo')
          expect($el).to.contain('0')
          cy.wrap($el)
          .find("[class*=circle_circle]")
          .should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)')
      })

      cy.wait(500)

      cy.get('[class*=circle_content]')
        .should('have.length', 1)
        .each(($el, index) => {
          expect($el).to.contain('algo')
          expect($el).to.contain('0')
          expect($el).to.contain('top')
      cy.wrap($el)
        .find("[class*=circle_circle]")
        .should(
          'have.css',
          'border',
          '4px solid rgb(210, 82, 225)')
        })

      cy.wait(500)

      cy.get("input").type("sosh")
      cy.contains("Добавить").click()
      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("algo")
            expect($el).to.contain("0")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          } else {
            expect($el).to.contain("sosh")
            expect($el).to.contain("1")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          }
        })

      cy.wait(500)

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("algo")
            expect($el).to.contain("0")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          } else {
            expect($el).to.contain("top")
            expect($el).to.contain("sosh")
            expect($el).to.contain("1")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          }
      })
    })
    it('Удаление элемента из стека работает корректно', () => {
      cy.get('input').type('algo')
      cy.contains('Добавить').click()
      cy.get('input').type('sosh')
      cy.contains('Добавить').click()

      cy.wait(500)

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("algo")
            expect($el).to.contain("0")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          } else {
            expect($el).to.contain("top")
            expect($el).to.contain("sosh")
            expect($el).to.contain("1")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          }
        })

        cy.contains('Удалить').click()
        cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el, index) => {
          expect($el).to.contain('algo')
          expect($el).to.contain('0')
          cy.wrap($el)
          .find("[class*=circle_circle]")
          .should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)')
      })

      cy.wait(500)

      cy.get('[class*=circle_content]')
        .should('have.length', 1)
        .each(($el, index) => {
          expect($el).to.contain('algo')
          expect($el).to.contain('0')
          expect($el).to.contain('top')
      cy.wrap($el)
        .find("[class*=circle_circle]")
        .should(
          'have.css',
          'border',
          '4px solid rgb(210, 82, 225)')
        })

      cy.wait(500)

      cy.contains('Удалить').click()
      cy.get("[class*=circle_content]").should('have.length', 0)
    })

    it('Кнопка очистить работает корректно', () => {
      cy.get('input').type('algo')
      cy.contains('Добавить').click()
      cy.get('input').type('sosh')
      cy.contains('Добавить').click()

      cy.wait(500)

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("algo")
            expect($el).to.contain("0")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)")
          } else {
            expect($el).to.contain("top")
            expect($el).to.contain("sosh")
            expect($el).to.contain("1")
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
          }
        })

      cy.contains('Очистить').click()
      cy.get("[class*=circle_content]").should('have.length', 0)
    })
  })
})