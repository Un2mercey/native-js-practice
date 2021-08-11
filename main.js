(() => {
    'use strict';

    const scripts = [
        'src/sum-of-numbers.js',
        'src/factorial.js',
        'src/fibonacci.js',
        'src/single-linked-list.js',
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

    const loadScripts = async () => {
        const promises = scripts.map(src => loadScriptPromise(src));
        document.body.style.fontFamily = `'Lato', san-serif`;
        document.body.style.fontSize = '24px';
        try {
            await Promise.all(promises);
        } catch (error) {
            console.error(error);
        }
    };

    return loadScripts();
})();


