(() => {
    'use strict';

    let argumentsArray;
    const regexp = new RegExp('^\\d*\\.*\\d+$', 'gm');

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleA = document.createElement('a');
    titleA.href = 'https://javascript.info/task/spy-decorator';
    titleA.innerText = 'Spy decorator';
    titleA.style.margin = '10px 0';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = 'Create a decorator spy(func) that should return a wrapper that saves all calls to function in its calls property.\nEvery call is saved as an array of arguments.';
    descriptionDiv.style.margin = '10px 0';

    const conditionContainer = document.createElement('div');
    conditionContainer.style.display = 'flex';
    conditionContainer.style.flexDirection = 'column';

    const conditionSpan = document.createElement('span');
    conditionSpan.innerText = 'Simple function to calculate sum of arguments\nEnter arguments comma separated: ';

    const argumentsInput = document.createElement('input');

    conditionContainer.appendChild(conditionSpan);
    conditionContainer.appendChild(argumentsInput);

    const resultDiv = document.createElement('div');

    const callBtn = document.createElement('button');
    callBtn.innerText = 'call fn';
    callBtn.disabled = true;
    callBtn.style.margin = '10px';

    const setInputStyle = (inputTag) => {
        inputTag.style.width = '365px';
        inputTag.style.height = '30px';
        inputTag.style.fontSize = '22px';
        inputTag.style.textAlign = 'center';
    };
    setInputStyle(argumentsInput);

    const setInputColor = (inputTag, color) => {
        inputTag.style.border = `3px solid ${color}`;
        inputTag.style.backgroundColor = color;
    };

    const checkInput = (value, keyCode) => {
        const splattedArray = value.split(',').filter(v => !!v).map(v => parseFloat(v.trim()));
        const condition = splattedArray.includes(NaN);
        callBtn.disabled = condition;
        if (!condition) {
            argumentsArray = [...splattedArray];
            setInputColor(argumentsInput, 'lightgreen');
            if (keyCode === 'Enter') {
                callBtn.click();
            }
        } else {
            setInputColor(argumentsInput, 'crimson');
        }
    };

    const checkInputDebounce = function(func, ms) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, ms);
        };
    };

    const checkInputWrapper = checkInputDebounce(checkInput, 500);

    const argumentsInputHandler = (ev) => {
        callBtn.disabled = true;
        checkInputWrapper(ev.target.value, ev.code);
    };
    argumentsInput.addEventListener('keyup', argumentsInputHandler);

    const simpleFunc = (args) => {
        let sum = 0;

    };

    const spyDecorator = () => {
        console.log(argumentsArray);
        return simpleFunc(...argumentsArray);
    };
    callBtn.addEventListener('click', spyDecorator);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleA);
    rootDiv.appendChild(descriptionDiv);
    rootDiv.appendChild(conditionContainer);
    rootDiv.appendChild(callBtn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(br);
})();