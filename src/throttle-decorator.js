

// const checkInputThrottle = (func, ms) => {
//     let isThrottled = false;
//     let savedCtx;
//     let savedArguments;
//
//     function throttleWrapper() {
//         if (isThrottled) {
//             savedCtx = this;
//             savedArguments = arguments;
//             return;
//         }
//         func.apply(this, arguments);
//         isThrottled = true;
//         setTimeout(() => {
//             isThrottled = false;
//             if (savedArguments) {
//                 if (savedArguments[0] !== arguments[0]) {
//                     throttleWrapper.apply(savedCtx, savedArguments);
//                 }
//                 savedCtx = null;
//                 savedArguments = null;
//             }
//         }, ms);
//     }
//
//     return throttleWrapper;
// };
