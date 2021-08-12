(() => {
    'use strict';

    let n;

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleA = document.createElement('a');
    titleA.href = 'https://javascript.info/task/spy-decorator';
    titleA.innerText = 'Sum all numbers till the given one';
    titleA.style.margin = '10px 0';

    const conditionDiv = document.createElement('div');
    conditionDiv.innerText = `Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.`;
    conditionDiv.style.margin = '10px 0';

    const conditionContainerDiv = document.createElement('div');
    conditionContainerDiv.style.display = 'flex';
    conditionContainerDiv.style.alignItems = 'center';
    conditionContainerDiv.style.margin = '10px 0';

    const conditionDescriptionSpan = document.createElement('span');
    conditionDescriptionSpan.innerText = `When n =`;

    const sumInput = document.createElement('input');
    sumInput.style.margin = '0 10px';
    sumInput.style.width = '85px';
    sumInput.style.height = '30px';
    sumInput.style.fontSize = '22px';
    sumInput.style.textAlign = 'center';

    conditionContainerDiv.appendChild(conditionDescriptionSpan);
    conditionContainerDiv.appendChild(sumInput);

    const calculateByRecursionBtn = document.createElement('button');
    calculateByRecursionBtn.disabled = true;
    calculateByRecursionBtn.innerText = 'calculate by recursion';
    calculateByRecursionBtn.style.margin = '10px';

    const calculateByFormulaBtn = document.createElement('button');
    calculateByFormulaBtn.disabled = true;
    calculateByFormulaBtn.innerText = 'calculate by formula';
    calculateByFormulaBtn.style.margin = '10px';

    const resultDiv = document.createElement('div');
    const resultDescriptionSpan = document.createElement('span');
    const resultValueSpan = document.createElement('span');
    resultDescriptionSpan.innerText = `result is: `;
    resultValueSpan.innerText = '0';
    resultDiv.appendChild(resultDescriptionSpan);
    resultDiv.appendChild(resultValueSpan);

    const formulaResultDiv = document.createElement('div');

    const recursion = (cur, iterNum) => {
        calculateByRecursionBtn.disabled = true;
        if (iterNum <= n) {
            setTimeout(() => {
                const res = cur + iterNum;
                resultDescriptionSpan.innerText = `${cur} + ${iterNum} = `;
                resultValueSpan.innerText = res;
                return recursion(res, ++iterNum);
            }, 100);
        } else {
            calculateByRecursionBtn.disabled = false;
            resultDescriptionSpan.innerText = `result by recursion: `;
            resultValueSpan.innerText = cur.toString();
        }
    };
    calculateByRecursionBtn.addEventListener('click', () => recursion(0, 1));

    const setFormulaResult = (res) => {
        formulaResultDiv.innerText = `result by formula = ${res}`;
    };

    const formula = () => {
        setFormulaResult(n * (n + 1) / 2);
    };
    calculateByFormulaBtn.addEventListener('click', formula);

    const sumInputKeyupHandler = (ev) => {
        n = parseInt(ev.target.value);
        calculateByFormulaBtn.disabled = isNaN(n);
        calculateByRecursionBtn.disabled = isNaN(n);
        if (ev.code === 'Enter') {
            calculateByRecursionBtn.click();
            calculateByFormulaBtn.click();
        }
    };
    sumInput.addEventListener('keyup', sumInputKeyupHandler);

    setFormulaResult(0);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleA);
    rootDiv.appendChild(conditionDiv);
    rootDiv.appendChild(conditionContainerDiv);
    rootDiv.appendChild(calculateByRecursionBtn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(calculateByFormulaBtn);
    rootDiv.appendChild(formulaResultDiv);
    rootDiv.appendChild(br);
})();
