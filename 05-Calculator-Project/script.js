const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, operator, n2) => {
  let result = ''

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)  //parseFloat - converts a string into a number with a decimal place
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
    const keyContent = key.textContent // text when key is pressed
    const displayedNum = display.textContent 
    const previousKeyType = calculator.dataset.previousKeyType
    
    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))


    // -------------- NUMBER -------------- //
    if (!action) {
        if (
         displayedNum === '0' ||
         previousKeyType === 'operator' || // after pressing an operator key, new number key pressed will be displayed
         previousKeyType === 'calculate'  // after the calculation (pressing =), new number key pressed will be displayed
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
          calculator.dataset.firstValue = calcValue // calculated value will be firstValue for the new calculation
        } else {
          calculator.dataset.firstValue = displayedNum // If no calculations, set displayedNum as the firstValue
        }

        // example: 99 - 1 = 98
        // pressing 99                    => displayNum
        // pressing -                     => "99" will be firstValue; "-"" will be operator
        // pressing 1                     => displayNum
        // pressing = or another operator => "1" will be secondValue; calculate function

        // - only after pressing the subtract button will 99 register as firstValue;
        // - only after pressing another operator will 1 register as secondValue;
    
        key.classList.add('is-depressed') // highlighted when pressed
        calculator.dataset.previousKeyType = 'operator' // tells if the previous key is an operator
        calculator.dataset.operator = action // to store operator
    }


    // -------------- DECIMAL -------------- //
    if (action === 'decimal') {

       if (
         !displayedNum.includes('.') &&
         previousKeyType !== 'operator'
         ) {
            display.textContent = displayedNum + '.'
        } else if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
         ) {
            display.textContent = '0.'
        }

        calculator.dataset.previousKeyType = 'decimal' // tells if the previous key is a decimal
    }


    // -------------- CLEAR -------------- //
    if (action === 'clear') {
        if (key.textContent === 'AC') { 
            calculator.dataset.firstValue = '' // hard reset
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }

        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear' // tells if the previous key is clear
    } else {
        const clearButton = document.querySelector('[data-action="clear"]')
        clearButton.textContent = 'CE'
    }

    // if (action !== 'clear') {
    //     const clearButton = document.querySelector('[data-action="clear"]')
    //     clearButton.textContent = 'CE'
    // }


    // -------------- CALCULATE -------------- //
    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue // using 'let' to reassign a new value
        const operator = calculator.dataset.operator
        let secondValue = displayedNum // using 'let' to reassign a new value

        if (firstValue) {
            if (previousKeyType === 'calculate') {
            firstValue = displayedNum // setting a new value for firstValue
            secondValue = calculator.dataset.modValue // setting a new value for secondValue
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

