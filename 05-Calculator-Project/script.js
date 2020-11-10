const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, operator, n2) => {
  let result = ''

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)  //parseFloat - converts a string into a number with decimal places
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    
    const key = e.target
    const action = key.dataset.action // all data-action
    const keyContent = key.textContent // the text when the key is pressed
    const displayedNum = display.textContent 
    const previousKeyType = calculator.dataset.previousKeyType
    
    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))


    // -------------- NUMBER -------------- //
    if (!action) {
        if (
         displayedNum === '0' ||
         previousKeyType === 'operator' ||
         previousKeyType === 'calculate'
        ) {
          display.textContent = keyContent
        } else {
            display.textContent = displayedNum + keyContent //appending
        }
        calculator.dataset.previousKeyType = 'number' // tells if the previous key is a number
    }


    // -------------- OPERATOR -------------- //
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
        ) {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          const calcValue = calculate(firstValue, operator, secondValue)
          display.textContent = calcValue
          calculator.dataset.firstValue = calcValue // calculated value as first value
        } else {
          calculator.dataset.firstValue = displayedNum // If no calculations, set displayedNum as the firstValue
        }

        // example: 99 - 1 = 98
        // - only after pressing the subtract button will 99 register as firstValue;
        // - only after pressing another operator will 1 register as secondValue;
    
        key.classList.add('is-depressed') // highlighted when pressed
        calculator.dataset.previousKeyType = 'operator' // tells if the previous key is an operator
        calculator.dataset.operator = action // to store operator
    }


    // -------------- DECIMAL -------------- //
    if (action === 'decimal') {
        if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            display.textContent = '0.'
        } else if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
        }

        calculator.dataset.previousKeyType = 'decimal' // tells if the previous key is a decimal
    }


    // -------------- CLEAR -------------- //
    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }

        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear' // tells if the previous key is clear
    }

    if (action !== 'clear') {
        const clearButton = document.querySelector('[data-action="clear"]')
        clearButton.textContent = 'CE'
    }


    // -------------- CALCULATE -------------- //
    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum

        if (firstValue) {
            if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
            }
            // after pressing =, displayed will be firstValue

            display.textContent = calculate(firstValue, operator, secondValue)
            // when no calculation is required, display remains the same
        }

        calculator.dataset.modValue = secondValue // carry forward of secondValue into the new calculation
        calculator.dataset.previousKeyType = 'calculate' // tells if the previous key is =
    }


  }
})

