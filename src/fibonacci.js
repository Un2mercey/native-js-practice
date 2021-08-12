(() => {
    'use strict';

    let fibN;

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleA = document.createElement('a');
    titleA.innerText = 'Fibonacci numbers';
    titleA.href = 'https://javascript.info/task/fibonacci-numbers';
    titleA.style.margin = '10px 0';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.style.display = 'flex';
    descriptionDiv.style.alignItems = 'center';

    const fibNInput = document.createElement('input');
    fibNInput.style.margin = '0 10px';
    fibNInput.style.width = '54px';
    fibNInput.style.height = '30px';
    fibNInput.style.fontSize = '22px';
    fibNInput.style.textAlign = 'center';

    const descriptionSpan = document.createElement('span');
    descriptionSpan.innerText = 'Index of number in the Fibonacci sequence';
    descriptionSpan.style.margin = '10px 0';

    descriptionDiv.appendChild(descriptionSpan);
    descriptionDiv.appendChild(fibNInput);

    const resultDiv = document.createElement('div');

    const fibBtn = document.createElement('button');
    fibBtn.innerText = 'get number';
    fibBtn.style.margin = '10px';
    fibBtn.disabled = true;

    // 1 1 2 3 5 8 13
    const fib = (num, idx= 1, prev = 1, cur = 1) => {
        return num - 1 > idx ? fib(num, idx + 1, cur, prev + cur) : cur;
    };

    const getOrdinalString = () => {
        const ordinalArray = ['th', 'st', 'nd', 'rd'];
        const remainderValue = fibN % 100;
        return ordinalArray[(remainderValue - 20) % 10] || ordinalArray[remainderValue] || ordinalArray[0];
    };

    const getEquation = () => {
        if (fibN < 3) {
            return 1;
        }
        return `${fib(fibN-2)} + ${fib(fibN-1)} = ${fib(fibN)}`;
    };

    const onClick = () => {
        resultDiv.innerText = `The ${fibN}'${getOrdinalString()} number of the Fibonacci sequence is: ${getEquation()}`;
    };
    fibBtn.addEventListener('click', onClick);

    const keyupHandler = (ev) => {
        fibN = parseInt(ev.target.value);
        fibBtn.disabled = isNaN(fibN) || !fibN;
        if (ev.code === 'Enter') {
            fibBtn.click();
        }
    };
    fibNInput.addEventListener('keyup', keyupHandler);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleA);
    rootDiv.appendChild(descriptionDiv);
    rootDiv.appendChild(fibBtn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(br);
})();
