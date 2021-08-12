(() => {
    'use strict';

    let factNum;

    const btn = document.createElement('button');
    btn.disabled = true;
    btn.style.margin = '10px';
    btn.innerText = 'calculate';

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleA = document.createElement('a');
    titleA.href = 'https://javascript.info/task/factorial';
    titleA.innerText = 'Calculate factorial';
    titleA.style.margin = '10px 0';

    const resultDiv = document.createElement('div');
    const descriptionSpan = document.createElement('span');
    const descriptionResultSpan = document.createElement('span');
    resultDiv.style.whiteSpace = 'unset';
    resultDiv.appendChild(descriptionSpan);
    resultDiv.appendChild(descriptionResultSpan);

    const conditionDiv = document.createElement('div');
    conditionDiv.style.display = 'flex';
    conditionDiv.style.alignItems = 'center';
    conditionDiv.style.margin = '10px 0';

    const conditionSpan = document.createElement('span');
    conditionSpan.innerText = `of`;

    const factNumInput = document.createElement('input');
    factNumInput.style.margin = '0 10px';
    factNumInput.style.width = '54px';
    factNumInput.style.height = '30px';
    factNumInput.style.fontSize = '22px';
    factNumInput.style.textAlign = 'center';

    conditionDiv.appendChild(conditionSpan);
    conditionDiv.appendChild(factNumInput);


    const calculate = (num, result = 1) => {
        descriptionSpan.innerText += ` ${num} * ${num -1}!\n ${num - 1}! = `;
        if (num === 1) {
            descriptionSpan.innerText = `${descriptionSpan.innerText.substr(0, descriptionSpan.innerText.lastIndexOf('*'))}\n${factNum}! = `;
        }
        return num === 1 ? result : calculate(num - 1, result * num);
    };

    const keyupHandler = (ev) => {
        factNum = parseInt(ev.target.value);
        descriptionSpan.innerText = isNaN(factNum) ? `bad value`: `${factNum}! = `;
        descriptionResultSpan.innerText = '';
        btn.disabled = isNaN(factNum);
        if (ev.code === 'Enter') {
            btn.click();
        }
    };
    factNumInput.addEventListener('keyup', keyupHandler);

    const btnClickHandler = () => {
        descriptionResultSpan.innerText = calculate(factNum).toString();
    };
    btn.addEventListener('click', btnClickHandler);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleA);
    rootDiv.appendChild(conditionDiv);
    rootDiv.appendChild(btn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(br);
})();
