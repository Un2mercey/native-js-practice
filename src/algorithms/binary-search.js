(() => {
    'use strict';

    let arrayOfSymbols = [];
    let searchValue = null;
    let iterations = 0;

    const replaceSpaces = (str) => {
        return str.replace(' ', '');
    };

    const setSearchValue = (ev) => {
        ev.target.value = replaceSpaces(ev.target.value);
        searchValue = ev.target.value;
    };

    const setArrayOfSymbols = (ev) => {
        ev.target.value = replaceSpaces(ev.target.value);
        arrayOfSymbols = ev.target.value.split(',');
    };

    const binarySearchByRecursion = (
        array = arrayOfSymbols,
        item = searchValue,
        start = 0,
        end = arrayOfSymbols.length
    ) => {
        iterations += 1;
        let middle = Math.floor((start + end) / 2);
        if (item === array[middle]) {
            return middle;
        }
        if (item < array[middle]) {
            return binarySearchByRecursion(array, item, 0, middle - 1);
        } else {
            return binarySearchByRecursion(array, item, middle + 1, end);
        }
    };

    const binarySearch = (array = arrayOfSymbols, item = searchValue) => {
        let start = 0;
        let end = array.length;
        let middle;
        let found = false;
        while (found === false && start <= end) {
            iterations += 1;
            middle = Math.floor((start + end) / 2);
            if (array[middle] === item) {
                found = true;
                return middle;
            }
            if (item < array[middle]) {
                end = middle - 1;
            } else {
                start = middle + 1;
            }
        }
    };

    const getBrDiv = () => {
        const br = document.createElement('div');
        br.className = 'br';
        return br;
    };

    const rootDiv = document.getElementById('root');
    const binarySearchContainer = document.createElement('section');
    binarySearchContainer.className = 'binary-search';

    const tittle = document.createElement('h1');
    tittle.innerText = 'Binary search algorithm';

    const firstRow = document.createElement('div');
    const firstRowLabel = document.createElement('label');
    firstRowLabel.innerText = 'Elements of array comma separated:';
    const firstRowInput = document.createElement('textarea');
    firstRowInput.addEventListener('input', setArrayOfSymbols);
    firstRow.appendChild(firstRowLabel);
    firstRow.appendChild(firstRowInput);

    const secondRow = document.createElement('div');
    const secondRowLabel = document.createElement('label');
    secondRowLabel.innerText = 'Searching elem:';
    const secondRowInput = document.createElement('input');
    secondRowInput.addEventListener('input', setSearchValue);
    secondRow.appendChild(secondRowLabel);
    secondRow.appendChild(secondRowInput);

    const button = document.createElement('button');
    button.innerText = 'Start search';

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

    const onStartSearch = () => {
        if (!searchValue || !arrayOfSymbols.length) {
            return;
        }
        iterations = 0;
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        const arrayLengthDiv = document.createElement('div');
        const timeDiv = document.createElement('div');
        const searchDiv = document.createElement('div');
        const iterationsDiv = document.createElement('div');
        const msTimeDiv = document.createElement('div');
        const startTime = performance.now();
        const result = binarySearch();
        const endTime = performance.now() - startTime;

        arrayLengthDiv.innerText = `Array length: ${arrayOfSymbols.length}`;
        searchDiv.innerText = result !== null ? `Item "${searchValue}" founded` : `Item "${searchValue}" not found`;
        timeDiv.innerText = `Elapsed time: ${endTime}ms`;
        iterationsDiv.innerText = `Iterations count: ${iterations}`;
        msTimeDiv.innerText = `Elapsed time if one iteration is equal to 1ms: `;
        msTimeDiv.innerText += iterations > 1000
            ? `${iterations / 1000}s`
            : `${iterations}ms`;

        resultDiv.appendChild(arrayLengthDiv);
        resultDiv.appendChild(searchDiv);
        resultDiv.appendChild(iterationsDiv);
        resultDiv.appendChild(timeDiv);
        resultDiv.appendChild(msTimeDiv);
        resultDiv.appendChild(getBrDiv());
        binarySearchContainer.appendChild(resultDiv);
    };

    button.addEventListener('click', onStartSearch);

    binarySearchContainer.appendChild(tittle);
    binarySearchContainer.appendChild(firstRow);
    binarySearchContainer.appendChild(secondRow);
    genButtonsDiv.appendChild(genButton);
    genButtonsDiv.appendChild(genSmallButton);
    genButtonsDiv.appendChild(genFewButton);
    binarySearchContainer.appendChild(genButtonsDiv);
    binarySearchContainer.appendChild(button);
    rootDiv.appendChild(binarySearchContainer);

})();
