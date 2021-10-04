(() => {
    'use strict';

    const rootDiv = document.getElementById('root');
    const navDiv = document.getElementById('nav');

    const decoratorsScripts = [
        {
            name: 'Sum of numbers',
            value: 'src/decorators/sum-of-numbers.js',
        },
        {
            name: 'Factorial',
            value: 'src/decorators/factorial.js',
        },
        {
            name: 'Fibonacci',
            value: 'src/decorators/fibonacci.js',
        },
        {
            name: 'Object listing',
            value: 'src/decorators/single-linked-list.js',
        },
        {
            name: 'Spy decorator',
            value: 'src/decorators/spy-decorator.js',
        },
        {
            name: 'Delaying decorator',
            value: 'src/decorators/delaying-decorator.js',
        },
        {
            name: 'Debounce decorator',
            value: 'src/decorators/debounce-decorator.js',
        },
        {
            name: 'Throttle decorator',
            value: 'src/decorators/throttle-decorator.js',
        },
    ];

    const algorithmsScripts = [
        {
            name: 'Linear search',
            value: 'src/algorithms/linear-search.js',
        },
        {
            name: 'Binary search',
            value: 'src/algorithms/binary-search.js',
        },
        {
            name: 'Selection sort',
            value: 'src/algorithms/selection-sort.js',
        },
        {
            name: 'Bubble sort',
            value: 'src/algorithms/bubble-sort.js',
        },
        {
            name: 'Quick sort',
            value: 'src/algorithms/quick-sort.js',
        },
    ];

    const loadScript = (src, callback) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error ${src}`));
        document.body.append(script);
    };

    const loadScriptPromise = (src) => {
        return new Promise(((resolve, reject) => {
            loadScript(src, (err, script) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(script);
                }
            });
        }));
    };

    const removeScripts = () => {
        const scripts = [...document.getElementsByTagName('script')].slice(1);
        if (scripts.length) {
            scripts.forEach(s => document.body.removeChild(s));
            rootDiv.innerText = '';
        }
    };

    const loadScripts = async (scriptsArr) => {
        removeScripts();
        const promises = scriptsArr.map(src => loadScriptPromise(src));
        try {
            await Promise.all(promises);
        } catch (error) {
            console.error(error);
        }
    };

    const createMenuItems = (pages) => {
        const pagesDiv = document.createElement('div');
        pagesDiv.className = 'dropdown-content';
        pages.forEach(p => {
            const pageA = document.createElement('a');
            pageA.innerText = p.name;
            pageA.addEventListener('click', async () => {
                removeScripts();
                await loadScriptPromise(p.value);
                localStorage.setItem('prev', p.value);
            });
            pagesDiv.append(pageA);
        });
        return pagesDiv;
    };

    const createNav = () => {
        const decoratorsDiv = document.createElement('div');
        decoratorsDiv.className = 'dropdown';
        const decoratorsMenuItems = createMenuItems(decoratorsScripts);
        const decoratorsBtn = document.createElement('button');
        decoratorsBtn.className = 'dropbtn';
        decoratorsBtn.innerText = 'Decorators';
        decoratorsDiv.appendChild(decoratorsBtn);
        decoratorsDiv.appendChild(decoratorsMenuItems);

        const algorithmsDiv= document.createElement('div');
        algorithmsDiv.className = 'dropdown';
        const algorithmsMenuItems = createMenuItems(algorithmsScripts);
        const algorithmBtn = document.createElement('button');
        algorithmBtn.className = 'dropbtn';
        algorithmBtn.innerText = 'Algorithms';
        algorithmsDiv.appendChild(algorithmBtn);
        algorithmsDiv.appendChild(algorithmsMenuItems);

        navDiv.appendChild(decoratorsDiv);
        navDiv.appendChild(algorithmsDiv);
    };

    const createBodyLayout = async () => {
        createNav();
        if (localStorage.getItem('prev')) {
            await loadScriptPromise(localStorage.getItem('prev'));
        }
    };

    return createBodyLayout();

})();


