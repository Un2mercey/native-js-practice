(() => {
    'use strict';

    const titleA = document.createElement('a');
    titleA.href = 'https://javascript.info/task/debounce';
    titleA.innerText = 'Debounce decorator';
    titleA.style.margin = '10px 0';

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';

    const conditionSpan = document.createElement('span');
    conditionSpan.innerText = 'Debounce delay (ms) =';
    conditionSpan.style.marginRight = '15px';

    const delayInput = document.createElement('input');
    delayInput.id = 'delayInput';

    const debounceTestInput = document.createElement('input');
    debounceTestInput.placeholder = 'Test debounce fn';
    debounceTestInput.style.margin = '10px 0';

    container.appendChild(conditionSpan);
    container.appendChild(delayInput);

    const resultDiv = document.createElement('div');
    const elapsedTimeDiv = document.createElement('div');
    const clearResultBtn = document.createElement('button');
    clearResultBtn.innerText = 'clear';

    const setInputStyle = (inputTag, width) => {
        inputTag.style.width = `${width}px`;
        inputTag.style.height = '30px';
        inputTag.style.fontSize = '22px';
        inputTag.style.textAlign = 'center';
    };
    setInputStyle(delayInput, 120);
    setInputStyle(debounceTestInput, 400);

    const clearResult = () => {
        elapsedTimeDiv.innerText = '';
        resultDiv.innerText = '' ;
    };
    clearResultBtn.addEventListener('click', clearResult);

    const delayInputHandler = (ev) => {
        ev.target.value = ev.target.value.replace(/[^\d]/g, '');
    };
    delayInput.addEventListener('keyup', delayInputHandler);

    const simpleFunc = (text) => {
        resultDiv.innerText = `After elapsed time result: ${text}`;
    };

    const debounceDecorator = (func, ms) => {
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

    const debounceTestInputHandler = (ev) => {
        const delay = parseInt(delayInput.value);
        if (!isNaN(delay) && !!ev.target.value) {
            debounceDecorator(simpleFunc, delay)(ev.target.value);
            viewElapsedTime(delay);
        }
    };
    debounceTestInput.addEventListener('keyup', debounceTestInputHandler);

    const rootDiv = document.getElementById('root');
    const debounceDecoratorContainer = document.createElement('div');
    debounceDecoratorContainer.className = 'debounce-decorator';
    debounceDecoratorContainer.appendChild(titleA);
    debounceDecoratorContainer.appendChild(container);
    debounceDecoratorContainer.appendChild(clearResultBtn);
    debounceDecoratorContainer.appendChild(debounceTestInput);
    debounceDecoratorContainer.appendChild(elapsedTimeDiv);
    debounceDecoratorContainer.appendChild(resultDiv);
    rootDiv.appendChild(debounceDecoratorContainer);

})();
