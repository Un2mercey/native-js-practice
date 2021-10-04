(() => {
    'use strict';

    let arrayOfSymbols = [];
    let iterations = 0;

    const replaceSpaces = (str) => {
        return str.replace(/[^\d,-]/gm, '');
    };

    const setArrayOfSymbols = (ev) => {
        ev.target.value = replaceSpaces(ev.target.value);
        arrayOfSymbols = ev.target.value.split(',').filter(Number);
    };

    const selectionSort = (array) => {
        for (let i = 0; i < array.length; i++) {
            let indexMin = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[indexMin]) {
                    indexMin = j;
                }
                iterations += 1;
            }
            const tmp = array[i];
            array[i] = array[indexMin];
            array[indexMin] = tmp;
        }
        return array;
    };

    const getBrDiv = () => {
        const br = document.createElement('div');
        br.className = 'br';
        return br;
    };

    const rootDiv = document.getElementById('root');
    const selectionSortContainer = document.createElement('section');
    selectionSortContainer.className = 'selection-sort';

    const tittle = document.createElement('h1');
    tittle.innerText = 'Selection sort algorithm';

    const firstRow = document.createElement('div');
    const firstRowLabel = document.createElement('label');
    firstRowLabel.innerText = 'Elements of array comma separated:';
    const firstRowInput = document.createElement('textarea');
    firstRowInput.addEventListener('input', setArrayOfSymbols);
    firstRow.appendChild(firstRowLabel);
    firstRow.appendChild(firstRowInput);

    const button = document.createElement('button');
    button.innerText = 'Start sort';

    const genButtonsDiv = document.createElement('div');
    genButtonsDiv.className = 'gen-buttons';

    const genButton = document.createElement('button');
    genButton.innerText = 'Generate big array';

    const genSmallButton = document.createElement('button');
    genSmallButton.innerText = 'Generate small array';

    const genFewButton = document.createElement('button');
    genFewButton.innerText = 'Generate few items';

    const generateArray = (length) => {
        const bigArr = Array.from(new Set(
            [...Array(length)]
                .map(e => Math.floor(
                    !!Math.floor(Math.random() * 2)
                        ?  Math.random() * length * 10
                        : -Math.random() * length * 10
                ).toString())
        ));
        firstRowInput.value = bigArr.join(',');
        arrayOfSymbols = bigArr;
    };

    genButton.addEventListener('click', () => generateArray(10000));
    genSmallButton.addEventListener('click', () => generateArray(100));
    genFewButton.addEventListener('click', () => generateArray(10));

    const onStartSort = () => {
        if (!arrayOfSymbols.length) {
            return;
        }

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        const arrayLengthDiv = document.createElement('div');
        const timeDiv = document.createElement('div');
        const listingDiv = document.createElement('div');
        const iterationsDiv = document.createElement('div');
        const msTimeDiv = document.createElement('div');
        const startTime = performance.now();
        const result = selectionSort(arrayOfSymbols);
        const endTime = performance.now() - startTime;

        arrayLengthDiv.innerText = `Array length: ${arrayOfSymbols.length}`;
        listingDiv.className = 'listing';
        listingDiv.innerText = `[${result.join(', ')}]`;
        timeDiv.innerText = `Elapsed time: ${endTime}ms`;
        iterationsDiv.innerText = `Iterations count: ${iterations}`;
        msTimeDiv.innerText = `Elapsed time if one iteration is equal to 1ms: `;
        msTimeDiv.innerText += iterations > 1000
            ? `${iterations / 1000}s`
            : `${iterations}ms`;

        resultDiv.appendChild(arrayLengthDiv);
        resultDiv.appendChild(iterationsDiv);
        resultDiv.appendChild(timeDiv);
        resultDiv.appendChild(msTimeDiv);
        resultDiv.appendChild(listingDiv);
        resultDiv.appendChild(getBrDiv());
        selectionSortContainer.appendChild(resultDiv);
    };

    button.addEventListener('click', onStartSort);

    selectionSortContainer.appendChild(tittle);
    selectionSortContainer.appendChild(firstRow);
    genButtonsDiv.appendChild(genButton);
    genButtonsDiv.appendChild(genSmallButton);
    genButtonsDiv.appendChild(genFewButton);
    selectionSortContainer.appendChild(genButtonsDiv);
    selectionSortContainer.appendChild(button);
    rootDiv.appendChild(selectionSortContainer);

})();
