describe('Список работает корректно', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
  })

  describe('Кнопки и их состояния работают корректно', () => {
    it('Кнопки корректно меняют свое состояние', () => {
      cy.contains('Добавить в head').should('be.disabled')
      cy.contains('Добавить в tail').should('be.disabled')
      cy.contains('Удалить из head').should('not.be.disabled')
      cy.contains('Удалить из tail').should('not.be.disabled')
      cy.get('input[name="value"]').type('algo')
      cy.contains('Добавить в head').should('not.be.disabled')
      cy.contains('Добавить в tail').should('not.be.disabled')
      cy.contains('Удалить из head').should('not.be.disabled')
      cy.contains('Удалить из tail').should('not.be.disabled')
      cy.get('input[name="value"]').clear()
      cy.contains('Добавить в head').should('be.disabled')
      cy.contains('Добавить в tail').should('be.disabled')
      cy.contains('Удалить из head').should('not.be.disabled')
      cy.contains('Удалить из tail').should('not.be.disabled')
    })

    it('Кнопки корректно меняют свое состояние(по индексу)', () => {
      cy.contains('Добавить по индексу').should('be.disabled')
      cy.contains('Удалить по индексу').should('be.disabled')
      cy.get('input[name="value"]').type('algo')
      cy.get('input[name="index"]').type('3')
      cy.contains('Добавить по индексу').should('not.be.disabled')
      cy.contains('Удалить по индексу').should('not.be.disabled')
      cy.get('input[name="value"]').clear()
      cy.get('input[name="index"]').clear()
      cy.contains('Добавить по индексу').should('be.disabled')
      cy.contains('Удалить по индексу').should('be.disabled')
    })
  })

  describe('Анимация и алгоритм списка работает корректно', () => {
    it('Дефолтный список отрисовывается корректно', () => {
      cy.get('[class*=circle_content]')
        .should('have.length', 12)
        .each(($el, index) => {
          cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css',
            'border',
            '4px solid rgb(0, 50, 255)')
          
            if(index === 0) expect($el).to.contain('head')
            if(index === 11) expect($el).to.contain('tail')
        })
    })


  it('Элемент корректно добавляется в head', () => {
    cy.get('input[name="value"]').type('sosh')
      cy.contains('Добавить в head').click()

      cy.get('[class*=circle_content]')
        .each(($el, index) => {
          if (index === 0) {
            cy.wrap($el)
              .siblings()
              .find('[class*=circle_small]')
              .should(
                'have.css', 
                'border', 
                '4px solid rgb(210, 82, 225)')
              .should(
                'have.text', 
                'sosh')
          }
      })

      cy.wait(500)

      cy.get('[class*=circle_content]')
        .each(($el, index) => {
          if (index === 0) {
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should(
                'have.css', 
                'border', 
                '4px solid rgb(127, 224, 81)')
              .should(
                'have.text', 
                'sosh')
          }
      })

      cy.wait(500)

      cy.get('[class*=circle_content]')
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain('head')
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should(
                'have.css', 
                'border', 
                '4px solid rgb(0, 50, 255)')
              .should(
                'have.text', 
                'sosh')
          }
      })
  })

  it('Корректно добавляется элемент в tail', () => {
    cy.get('input[name="value"]').type('sosh')
    cy.contains('Добавить в tail').click()

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 10)
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(0, 50, 255)')
      if (index === 11) {
        cy.wrap($el)
          .siblings()
          .find('[class*=circle_small]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(210, 82, 225)')
          .should(
            'have.text', 
            'sosh')
      }
    })

    cy.wait(500)


    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 12) {
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(127, 224, 81)')
          .should(
            'have.text', 
            'sosh')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 12) {
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(0, 50, 255)')
          .should(
            'have.text', 
            'sosh')
        expect($el).to.contain('tail')
      }
    })
  })


  it('Корректно удаляется элемент из head', function () {
    cy.contains('Удалить из head').click()

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el)
          .siblings()
          .find('[class*=circle_small]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(210, 82, 225)')
          .should('not.have.text', '')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(0, 50, 255)')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 0) {
        expect($el).to.contain('head')
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(0, 50, 255)')
      }
    })
  })

  it('Корректно удаляется элемент из tail', function () {
    cy.contains('Удалить из tail').click()

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 11) {
        cy.wrap($el)
          .siblings()
          .find('[class*=circle_small]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(210, 82, 225)')
          .should('not.have.text', '')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 11) {
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(0, 50, 255)')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 11) {
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

  it('Корректно добавляется элемент по индексу', function () {
    cy.get('input[name="value"]').type('algo')
    cy.get('input[name="index"]').type("2")
    cy.contains('Добавить по индексу').click()

    for (let i = 0; i <= 2; i++) {
      cy.get('[class*=circle_content]').each(($el, index) => {
        let currentIndex = i
        if (index < currentIndex)
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(210, 82, 225)')
        if (index === currentIndex) {
          cy.wrap($el)
            .siblings()
            .find('[class*=circle_small]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(210, 82, 225)')
            .should('have.text', 'algo')
        }
      })

      cy.wait(500)
    }

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 2) {
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(127, 224, 81)')
          .should('have.text', 'algo')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 2) {
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(0, 50, 255)')
          .should('have.text', 'algo')
        expect($el).to.contain('2')
      }
    })
  })

  it('Корректно удаляется элемент по индексу', function () {
    cy.get('input[name="value"]').type('algo')
    cy.get('input[name="index"]').type('2')
    cy.contains('Удалить по индексу').click()

    for (let i = 0; i <= 2; i++) {
      cy.get('[class*=circle_content]').each(($el, index) => {
        let currentIndex = i
        if (index <= currentIndex)
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should(
              'have.css', 
              'border', 
              '4px solid rgb(210, 82, 225)')
      })

      cy.wait(500)
    }
    cy.get('[class*=circle_content]').each(($el, index) => {
      if (index === 2) {
        cy.wrap($el)
          .siblings()
          .find('[class*=circle_small]')
          .should(
            'have.css', 
            'border', 
            '4px solid rgb(210, 82, 225)')
          .should('not.have.text', '')
      }
    })

    cy.wait(500)

    cy.get('[class*=circle_content]').each(($el, index) => {
      cy.wrap($el)
        .find('[class*=circle_circle]')
        .should(
          'have.css', 
          'border', 
          '4px solid rgb(0, 50, 255)')
    })
  })
  })
})