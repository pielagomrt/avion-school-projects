// REFACTORING

const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = (key) => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator'
  // For everything else, return the action
  return action
}


// Pure - returns what needs to be displayed
const createResultString = (key, displayedNum, state) => {
    const keyType = getKeyType(key)
    const keyContent = key.textContent
    const {
    firstValue,
    modValue,
    operator,
    previousKeyType
    } = state

        // ---------- NUMBER ---------- //
        if (keyType === 'number') {
            return displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ? keyContent
            : displayedNum + keyContent
        }

        // ---------- DECIMAL ---------- //
        if (keyType === 'decimal') {
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
            if (!displayedNum.includes('.')) return displayedNum + '.'
            return displayedNum
        }

        // ---------- OPERATOR ---------- //
        if (keyType === 'operator') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator

            return firstValue &&
            operator &&
            previousKeyType !==  'operator' &&
            previousKeyType !==  'calculate'
            ? calculate(firstValue, operator, displayedNum)
            : displayedNum
        }

        // ---------- CLEAR ---------- //
        if (keyType === 'clear') return 0

        // ---------- CALCULATE ---------- //
        if (keyType === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const modValue = calculator.dataset.modValue

            return firstValue
            ? previousKeyType === 'calculate'
                ? calculate(displayedNum, operator, modValue)
                : calculate(firstValue, operator, displayedNum)
            : displayedNum
        }
        
}


// Impure - changes the calculator’s visual appearance and custom attributes
const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  
  const keyType = getKeyType(key)
  calculator.dataset.previousKeyType = keyType

    // -------------- OPERATOR -------------- //
    if (keyType === 'operator') {
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = firstValue &&
        operator &&
        previousKeyType !==  'operator' &&
        previousKeyType !==  'calculate'
        ? calculatedValue
        : displayedNum
    }

    // -------------- CLEAR -------------- //
    if (keyType === 'clear' && key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.modValue = ''
        calculator.dataset.previousKeyType = ''
    } 

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
        ? modValue
        : displayedNum
    }
}
// Impure
const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

  if (keyType === 'operator') key.classList.add('is-depressed')

  if (keyType === 'clear' && key.textContent !==  'AC') {
    key.textContent = 'AC'
  }

  if (keyType !==  'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}


keys.addEventListener('click', e => {
    if (e.target.matches('button')) return

    const key = e.target
    const displayedNum = display.textContent
    
    // Pure functions
    const resultString = createResultString(key, displayedNum, calculator.dataset)

    // Update states
    display.textContent = resultString
    updateCalculatorState(key, calculator, resultString, displayedNum)
    updateVisualState(key, calculator)
  }

