'use strict';

(() => {
    const br = document.createElement('div');
    br.style["borderBottom"] = '1px solid';
    br.style.margin = '10px 0';

    // 1 1 2 3 5 8 13
    const fib = (num, idx= 1, prev = 1, cur = 1) => {
        return num - 1 > idx ? fib(num, idx + 1, cur, prev + cur) : cur;
    };

    const onClick = () => {
        resultDiv.innerText = fib(fibN).toString();
    };

    const keyupHandler = (ev) => {
        fibN = parseInt(ev.target.value);
        fibBtn.disabled = isNaN(fibN);
        if (ev.code === 'Enter') {
            fibBtn.click();
        }
    }

    let fibN;

    const titleDiv = document.createElement('div');
    titleDiv.innerText = 'Fibonacci numbers';

    const descriptionDiv = document.createElement('div');

    const descriptionSpan = document.createElement('span');
    descriptionSpan.innerText = 'What number in the Fibonacci sequence should be returned ?';

    const fibNInput = document.createElement('input');
    fibNInput.style.margin = '0 5px';
    fibNInput.addEventListener('keyup', keyupHandler);

    descriptionDiv.style.display = 'flex';
    descriptionDiv.appendChild(descriptionSpan);
    descriptionDiv.appendChild(fibNInput);

    const resultDiv = document.createElement('div');

    const fibBtn = document.createElement('button');
    fibBtn.addEventListener('click', onClick);
    fibBtn.innerText = 'get number';
    fibBtn.style.margin = '10px';
    fibBtn.disabled = true;


    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleDiv);
    rootDiv.appendChild(descriptionDiv);
    rootDiv.appendChild(fibBtn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(br);

})();
