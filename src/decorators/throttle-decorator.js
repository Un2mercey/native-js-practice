(() => {
    'use strict';

    const titleA = document.createElement('a');
    titleA.href = 'https://javascript.info/task/throttle';
    titleA.innerText = 'Throttle decorator';
    titleA.style.margin = '10px 0';

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';

    const conditionSpan = document.createElement('span');
    conditionSpan.innerText = 'Throttle delay (ms) =';
    conditionSpan.style.marginRight = '15px';

    const delayInput = document.createElement('input');

    const canvas = document.createElement('canvas');

    container.appendChild(conditionSpan);
    container.appendChild(delayInput);

    const resultDivX = document.createElement('div');
    const resultDivY = document.createElement('div');
    const elapsedTimeDiv = document.createElement('div');

    const setInputStyle = () => {
        delayInput.style.width = '120px';
        delayInput.style.height = '30px';
        delayInput.style.fontSize = '22px';
        delayInput.style.textAlign = 'center';
    };
    setInputStyle();

    const delayInputHandler = (ev) => {
        ev.target.value = ev.target.value.replace(/[^\d]/g, '');
    };
    delayInput.addEventListener('keyup', delayInputHandler);

    const setResult = (x, y) => {
        resultDivX.innerText = `Coordinate X: ${x}`;
        resultDivY.innerText = `Coordinate Y: ${y}`;
    };

    let isThrottled = false;
    let savedArgs;
    const throttleDecorator = (func, timerFunc, ms) => {
        const throttleWrapper = (...args) => {
            if (isThrottled) {
                savedArgs = args;
                return;
            }
            func.apply(null, args);
            timerFunc(ms);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
                if (savedArgs) {
                    throttleWrapper.apply(null, savedArgs);
                    savedArgs = null;
                }
            }, ms);
        };
        return throttleWrapper;
    };

    const getElapsedTime = (start) => {
        return new Date().getTime() - start.getTime();
    };

    let interval;
    const viewElapsedTime = (ms) => {
        if (!interval) {
            const startTime = new Date();
            interval = setInterval(() => {
                elapsedTimeDiv.innerText = `elapsed time: ${getElapsedTime(startTime)}`;
            });
            setTimeout(() => {
                clearInterval(interval);
                interval = null;
            }, ms);
        }
    };

    const canvasMousemoveHandler = (ev) => {
        const delay = parseInt(delayInput.value);
        if (!isNaN(delay)) {
            throttleDecorator(setResult, viewElapsedTime, delay)(ev.clientX, ev.clientY);
        }
    };
    canvas.addEventListener('mousemove', canvasMousemoveHandler);

    const rootDiv = document.getElementById('root');
    const throttleDecoratorContainer = document.createElement('div');
    throttleDecoratorContainer.className = 'throttle-decorator';
    throttleDecoratorContainer.appendChild(titleA);
    throttleDecoratorContainer.appendChild(container);
    throttleDecoratorContainer.appendChild(canvas);
    throttleDecoratorContainer.appendChild(elapsedTimeDiv);
    throttleDecoratorContainer.appendChild(resultDivX);
    throttleDecoratorContainer.appendChild(resultDivY);
    rootDiv.appendChild(throttleDecoratorContainer);

})();
