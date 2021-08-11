(() => {
    'use strict';

    let fibN;

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleDiv = document.createElement('div');
    titleDiv.innerText = 'Fibonacci numbers';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.style.display = 'flex';

    const fibNInput = document.createElement('input');
    fibNInput.style.margin = '0 5px';

    const descriptionSpan = document.createElement('span');
    descriptionSpan.innerText = 'What number in the Fibonacci sequence should be returned ?';

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

    const onClick = () => {
        resultDiv.innerText = fib(fibN).toString();
    };
    fibBtn.addEventListener('click', onClick);

    const keyupHandler = (ev) => {
        fibN = parseInt(ev.target.value);
        fibBtn.disabled = isNaN(fibN);
        if (ev.code === 'Enter') {
            fibBtn.click();
        }
    };
    fibNInput.addEventListener('keyup', keyupHandler);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleDiv);
    rootDiv.appendChild(descriptionDiv);
    rootDiv.appendChild(fibBtn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(br);
})();
