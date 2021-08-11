'use strict';
(() => {
    let n;
    const recursion = (cur, iterNum) => {
        btn.disabled = true;
        if (iterNum <= n) {
            setTimeout(() => {
                const res = cur + iterNum;
                resultDescriptionSpan.innerText = `${cur} + ${iterNum} = `;
                resultValueSpan.innerText = res;
                return recursion(res, ++iterNum);
            }, 100);
        } else {
            btn.disabled = false;
            resultDescriptionSpan.innerText = `result by recursion: `;
            resultValueSpan.innerText = cur.toString();
        }
    }

    const formula = () => {
        setFormulaResult(n * (n + 1) / 2);
    }

    const setFormulaResult = (res) => {
        divFormulaResult.innerText = `result by formula = ${res}`;
    }

    const sumInputKeyupHandler = (ev) => {
        n = parseInt(ev.target.value);
        btnFormula.disabled = isNaN(n);
        btn.disabled = isNaN(n);
        if (ev.code === 'Enter') {
            btn.click();
            btnFormula.click();
        }
    };

    const btn = document.createElement('button');
    btn.disabled = true;
    btn.innerText = 'calc by recursion';
    btn.style.margin = '10px';
    btn.addEventListener('click', () => recursion(0, 1));

    const btnFormula = document.createElement('button');
    btnFormula.disabled = true;
    btnFormula.innerText = 'calc by formula';
    btnFormula.style.margin = '10px';
    btnFormula.addEventListener('click', formula);

    const divFormulaResult = document.createElement('div');
    setFormulaResult(0);

    const resultDiv = document.createElement('div');

    const resultDescriptionSpan = document.createElement('span');
    resultDescriptionSpan.innerText = `result is: `;

    const resultValueSpan = document.createElement('span');
    resultValueSpan.innerText = '0';

    resultDiv.appendChild(resultDescriptionSpan);
    resultDiv.appendChild(resultValueSpan);

    const conditionDiv = document.createElement('div');
    conditionDiv.innerText = `Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.`;

    const nDiv = document.createElement('div');
    nDiv.style.display = 'flex';

    const nSpan = document.createElement('span');
    nSpan.innerText = `n = `;

    const sumInput = document.createElement('input');
    sumInput.style.margin = '0 5px';
    sumInput.addEventListener('keyup', sumInputKeyupHandler);

    nDiv.appendChild(nSpan);
    nDiv.appendChild(sumInput);

    const br = document.createElement('div');
    br.style["borderBottom"] = '1px solid';
    br.style.margin = '10px 0';

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(conditionDiv);
    rootDiv.appendChild(nDiv);
    rootDiv.appendChild(btn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(btnFormula);
    rootDiv.appendChild(divFormulaResult);
    rootDiv.appendChild(br);
})();
