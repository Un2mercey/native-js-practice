(() => {
    'use strict';

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleA = document.createElement('a');
    titleA.href = 'https://javascript.info/task/debounce';
    titleA.innerText = 'Debounce decorator';
    titleA.style.margin = '10px 0';

    const container = document.createElement('div');
    container.style.display = 'flex';

    const conditionSpan = document.createElement('span');
    conditionSpan.style.marginRight = '15px';

    const delayInput = document.createElement('input');
    delayInput.id = 'delayInput';

    const debounceTestInput = document.createElement('input');
    debounceTestInput.placeholder = 'Test debounce fn';
    debounceTestInput.style.margin = '20px';

    container.appendChild(conditionSpan);
    container.appendChild(delayInput);

    const resultDiv = document.createElement('div');
    const elapsedTimeDiv = document.createElement('div');

    const setInputStyle = (inputTag, width) => {
        inputTag.style.width = `${width}px`;
        inputTag.style.height = '30px';
        inputTag.style.fontSize = '22px';
        inputTag.style.textAlign = 'center';
    };
    setInputStyle(delayInput, 120);
    setInputStyle(debounceTestInput, 400);

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
            elapsedTimeDiv.innerText = '';
            debounceDecorator(simpleFunc, delay)(ev.target.value);
            viewElapsedTime(delay);
        }
    };
    debounceTestInput.addEventListener('keyup', debounceTestInputHandler);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleA);
    rootDiv.appendChild(container);
    rootDiv.appendChild(debounceTestInput);
    rootDiv.appendChild(elapsedTimeDiv);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(br);
})();
