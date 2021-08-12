(() => {
    'use strict';

    let timeout;

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleA = document.createElement('a');
    titleA.href = 'https://javascript.info/task/delay';
    titleA.innerText = 'Delaying decorator';
    titleA.style.margin = '10px 0';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = 'Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.';
    descriptionDiv.style.margin = '10px 0';

    const conditionContainer = document.createElement('div');
    conditionContainer.style.display = 'flex';
    conditionContainer.style.flexDirection = 'column';

    const firstRowDiv = document.createElement('div');
    firstRowDiv.style.display = 'flex';
    firstRowDiv.style.margin = '10px 0';

    const conditionSpan = document.createElement('span');
    conditionSpan.innerText = 'Simple function to calculate sum of arguments with delay =';
    conditionSpan.style.marginRight = '15px';

    const delayInput = document.createElement('input');
    delayInput.id = 'delayInput';

    const secondRow = document.createElement('div');
    secondRow.style.display = 'flex';
    secondRow.style.margin = '10px 0';

    const argumentAInput = document.createElement('input');
    const argumentBInput = document.createElement('input');

    const conditionPlusDiv = document.createElement('div');
    conditionPlusDiv.innerText = '+';
    conditionPlusDiv.style.margin = '0 15px';

    const conditionEqualsDiv = document.createElement('div');
    conditionEqualsDiv.innerText = '=';
    conditionEqualsDiv.style.margin = '0 15px';

    const resultDiv = document.createElement('div');

    firstRowDiv.appendChild(conditionSpan);
    firstRowDiv.appendChild(delayInput);

    secondRow.appendChild(argumentAInput);
    secondRow.appendChild(conditionPlusDiv);
    secondRow.appendChild(argumentBInput);
    secondRow.appendChild(conditionEqualsDiv);
    secondRow.appendChild(resultDiv);

    conditionContainer.appendChild(firstRowDiv);
    conditionContainer.appendChild(secondRow);

    const elapsedTimeDiv = document.createElement('div');

    const callBtn = document.createElement('button');
    callBtn.innerText = 'call fn';
    callBtn.disabled = true;
    callBtn.style.margin = '10px';

    const setInputStyle = (inputTag) => {
        inputTag.style.width = '80px';
        inputTag.style.height = '30px';
        inputTag.style.fontSize = '22px';
        inputTag.style.textAlign = 'center';
    };
    setInputStyle(argumentAInput);
    setInputStyle(argumentBInput);
    setInputStyle(delayInput);

    const setInputColor = (color, ...args) => {
        args.forEach(inputTag => {
            inputTag.style.border = color ? `3px solid ${color}` : '1px solid black';
            inputTag.style.backgroundColor = color || 'unset';
        });
    };

    const fixInput = (value, id) => {
        if (id === 'delayInput') {
            return value.replace(/[^\d]/g, '');
        }
        return value.replace(/.*?(([0-9]*\.)?[0-9]+).*/g, '$1');
    };

    const isNanCheck = () => {
        return isNaN(parseInt(delayInput.value)) ||
            isNaN(parseFloat(argumentAInput.value)) ||
            isNaN(parseFloat(argumentBInput.value));
    };

    const inputHandler = (ev) => {
        callBtn.disabled = true;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            ev.target.value = fixInput(ev.target.value, ev.target.id);
            callBtn.disabled = isNanCheck();
            if (!callBtn.disabled && ev.key === 'Enter') {
                callBtn.click();
            }
        }, 500);
    };
    argumentAInput.addEventListener('keyup', inputHandler);
    argumentBInput.addEventListener('keyup', inputHandler);
    delayInput.addEventListener('keyup', inputHandler);

    const simpleFunc = (args) => {
        resultDiv.innerText = args.reduce((acc, cur) => acc += cur, 0);
    };

    const freezeWhileDelay = (arg) => {
        delayInput.disabled = arg;
        argumentAInput.disabled = arg;
        argumentBInput.disabled = arg;
        callBtn.disabled = arg;
        setInputColor(arg ? 'aquamarine' : null, delayInput, argumentAInput, argumentBInput);
    };

    const delayDecorator = (func, ms) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(null, args), ms);
        };
    };

    const getElapsedTime = (start) => {
        return new Date().getTime() - start.getTime();
    };

    const viewElapsedTime = (ms) => {
        let interval;
        const startTime = new Date();
        interval = setInterval(() => {
            elapsedTimeDiv.innerText = `elapsed time: ${getElapsedTime(startTime)}`;
        });
        setTimeout(clearInterval, ms, interval);
    };

    const callBtnClickHandler = () => {
        resultDiv.innerText = '';
        elapsedTimeDiv.innerText = '';
        const delay = parseInt(delayInput.value);
        const argA = parseFloat(argumentAInput.value);
        const argB = parseFloat(argumentBInput.value);
        freezeWhileDelay(true);
        delayDecorator(freezeWhileDelay, delay)(false);
        delayDecorator(simpleFunc, delay)([argA, argB]);
        viewElapsedTime(delay);
    };
    callBtn.addEventListener('click', callBtnClickHandler);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleA);
    rootDiv.appendChild(descriptionDiv);
    rootDiv.appendChild(conditionContainer);
    rootDiv.appendChild(callBtn);
    rootDiv.appendChild(elapsedTimeDiv);
    rootDiv.appendChild(br);
})();
