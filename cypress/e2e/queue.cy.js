describe('Очередь работает корректно', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue')
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

  it('Элементы добавляются в очередь корректно', () => {
    cy.get('input').type('algo')
    cy.contains('Добавить').click()
    cy.get('[class*=circle_content]')
      .each(($el, index) => {
        if(index === 0) {
          expect($el).to.contain('algo')
          expect($el).to.contain('0')
          expect($el).to.contain('head')
          expect($el).to.contain('tail')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css',
              'border',
              '4px solid rgb(210, 82, 225)')
        }
      })

    cy.wait(500)

    cy.get('[class*=circle_content]')
      .each(($el, index) => {
        if(index === 0) {
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(0, 50, 255)')
        }
      })

    cy.wait(500)

    cy.get('input').type('sosh')
    cy.contains('Добавить').click()
    cy.get('[class*=circle_content]')
      .each(($el, index) => {
        if(index === 0) {
          expect($el).to.contain('algo')
          expect($el).to.contain('0')
          expect($el).to.contain('head')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css',
              'border',
              '4px solid rgb(0, 50, 255)')
        }

        if(index === 1) {
          expect($el).to.contain('sosh')
          expect($el).to.contain('1')
          expect($el).to.contain('tail')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css',
              'border',
              '4px solid rgb(210, 82, 225)')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]')
      .each(($el, index) => {
        if(index === 0) {
          expect($el).to.contain('algo')
          expect($el).to.contain('0')
          expect($el).to.contain('head')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(0, 50, 255)')
        }
        
        if(index === 1) {
          expect($el).to.contain('sosh')
          expect($el).to.contain('1')
          expect($el).to.contain('tail')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css',
              'border',
              '4px solid rgb(0, 50, 255)')
        }
      })
  })

  it('Элементы удаляются корректно', () => {
    cy.get('input').type('algo')
    cy.contains('Добавить').click()
    cy.get('input').type('sosh')
    cy.contains('Добавить').click()

    cy.wait(500)

    cy.get('[class*=circle_content]')
      .each(($el, index) => {
        if(index === 0) {
          expect($el).to.contain('algo')
          expect($el).to.contain('head')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(0, 50, 255)')
        }

        if(index === 1) {
          expect($el).to.contain('sosh')
          expect($el).to.contain('tail')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css',
              'border',
              '4px solid rgb(0, 50, 255)')
        }
      })

      cy.contains('Удалить').click()
      cy.get('[class*=circle_content]')
        .each(($el, index) => {
          if(index === 0) {
            expect($el).to.contain('')
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should(
                'have.css', 
                'border', 
                '4px solid rgb(0, 50, 255)')
          }

          if(index === 1) {
            expect($el).to.contain('sosh')
            expect($el).to.contain('1')
            expect($el).to.contain('head')
            expect($el).to.contain('tail')
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should(
                'have.css',
                'border',
                '4px solid rgb(210, 82, 225)')
            }
          })

      cy.wait(500)

      cy.get('[class*=circle_content]')
        .each(($el, index) => {
          if(index === 0) {
            expect($el).to.contain('')
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should(
                'have.css', 
                'border', 
                '4px solid rgb(0, 50, 255)')
          }

          if(index === 1) {
            expect($el).to.contain('sosh')
            expect($el).to.contain('1')
            expect($el).to.contain('head')
            expect($el).to.contain('tail')
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should(
                'have.css', 
                'border', 
                '4px solid rgb(0, 50, 255)')
          }
      })

      cy.wait(500)

      cy.contains('Удалить').click()
      cy.get('[class*=circle_content]')
        .each(($el, index) => {
          if(index === 0) {
            expect($el).to.contain('')
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should(
                'have.css', 
                'border', 
                '4px solid rgb(0, 50, 255)')
        }
        if(index === 1) {
          expect($el).to.contain('')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(0, 50, 255)')
        }
      })
  })

  it('Кнопка очистить работает корректно', () => {
    cy.get('input').type('algo')
    cy.contains('Добавить').click()
    cy.get('input').type('sosh')
    cy.contains('Добавить').click()

    cy.wait(500)

    cy.get('[class*=circle_content]')
      .each(($el, index) => {
        if(index === 0) {
          expect($el).to.contain('algo')
          expect($el).to.contain('head')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(0, 50, 255)')
        }

        if(index === 1) {
          expect($el).to.contain('sosh')
          expect($el).to.contain('tail')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css',
              'border',
              '4px solid rgb(0, 50, 255)')
        }
      })

    cy.wait(500)

    cy.contains('Очистить').click()

    cy.get('[class*=circle_content]')
      .each(($el, index) => {
        if(index === 0) {
          expect($el).to.contain('')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(0, 50, 255)')
        }

        if(index === 1) {
          expect($el).to.contain('')
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(0, 50, 255)')
        }
      })
  })
})