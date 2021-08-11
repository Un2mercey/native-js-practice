(() => {
    'use strict';

    const list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: {
                        value: 5,
                        next: {
                            value: 6,
                            next: {
                                value: 7,
                                next: {
                                    value: 8,
                                    next: {
                                        value: 9,
                                        next: {
                                            value: 10,
                                            next: null
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    const br = document.createElement('div');
    br.style.borderBottom = '1px solid';
    br.style.margin = '10px 0';

    const titleDiv = document.createElement('div');
    titleDiv.innerText = 'Output a single-linked list';

    const resultDiv = document.createElement('div');
    resultDiv.style.whiteSpace = 'pre';
    resultDiv.style.fontFamily = `'Roboto Mono', monospace`;
    resultDiv.style.fontSize = '10px';

    const showListBtn = document.createElement('button');
    showListBtn.innerText = 'show listing';
    showListBtn.style.margin = '10px';
    showListBtn.disabled = false;

    const reverse = (iter) => {
        const bracketDiv = document.createElement('div');
        if (iter === 0) {
            showListBtn.disabled = false;
            bracketDiv.innerText = '}';
            resultDiv.appendChild(bracketDiv);
        } else {
            bracketDiv.innerText = '\t'.repeat(iter) + '}';
            resultDiv.appendChild(bracketDiv);
            return reverse(--iter);
        }
    };

    const showList = (obj, iter = 0) => {
        if (!showListBtn.disabled) {
            showListBtn.disabled = true;
        }
        setTimeout(() => {
            const value = {...obj};
            const valueDiv = document.createElement('div');
            if (iter === 0) {
                valueDiv.innerText = '{\n';
                resultDiv.appendChild(valueDiv);
            }
            valueDiv.innerText += '\t'.repeat(iter + 1) + `"value": ${value.value}`;
            const next = !!value.next ? `"next": {` : `"next": ${value.next}`;
            valueDiv.innerText += '\n' + '\t'.repeat(iter + 1) + next;
            resultDiv.appendChild(valueDiv);
            return !value.next ? reverse(iter) : showList(value.next, ++iter);
        }, 500);
    };

    const btnClickHandler = () => {
        resultDiv.innerText = '';
        showList(list);
    };
    showListBtn.addEventListener('click', btnClickHandler);

    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(br);
    rootDiv.appendChild(titleDiv);
    rootDiv.appendChild(showListBtn);
    rootDiv.appendChild(resultDiv);
    rootDiv.appendChild(br);
})();
