const greeting = document.querySelector('.greeting__calculator')
const keys = document.querySelector('.input__keys')
const display = document.querySelector('.input__display')
const input = document.querySelector('#name');
const inputSubmit = document.querySelector('#name-btn');

inputSubmit.addEventListener('click', () => {
      display.textContent = input.value;
      display.style.textTransform = 'capitalize';
    });

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedText = display.textContent 
    const previousKeyType = greeting.dataset.previousKeyType

    // -------------- INPUT -------------- //
    if (!action) {
        if (displayedText === '0' || previousKeyType === 'name') {
          display.textContent = keyContent
        }
        greeting.dataset.previousKeyType = 'name'
    }


    // -------------- SAY HELLO -------------- //
    if (action === 'hello') {
        if (previousKeyType === 'name' || displayedText === input.value ) {
            display.textContent = `Hello, ${displayedText}!`;
            input.value = '';
        } else {
            display.textContent = 0;
        }
    }

    // -------------- SAY GOODBYE -------------- //
     if (action === 'goodbye') {
        key.textContent = 'CLEAR'
        if (previousKeyType === 'name' || displayedText === input.value) {
            display.textContent = `Goodbye, ${displayedText}!`;
            input.value = '';
        } else if (previousKeyType === 'bye') {
          const clearThis = document.querySelector('[data-action="goodbye"]')
          clearThis.textContent = 'sG'
          display.textContent = 0;
    }
        greeting.dataset.previousKeyType = 'bye'
  }

}});

