const serialize = (obj: any = {}) => {
    const str = [];

    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }

    return str.join('&');
};

function compose(...fns: Function[]) {
    const reducer = async (acc: any, fn: Function) => {
        const x = await acc;

        if (fn.constructor.name == 'AsyncFunction') {
            return await fn(x)
        } else {
            return fn(x)
        }
    }

    return function (value: any) {
        return fns.reduce(reducer, value);
    }
}

//
// function paramsToObject(params): object {
//     const urlParams = new URLSearchParams(params);
//     // @ts-ignore
//     const entries = urlParams.entries();
//     const result = {};
//     for (const entry of entries) { // each 'entry' is a [key, value] tupple
//         const [key, value] = entry;
//         result[key] = value;
//     }
//     return result;
// }
//
function cleanEmptyPropetiesFromObjects(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}
//
// function extractHtmlTags(html): string {
//     const el: HTMLElement = document.createElement('div');
//     el.innerHTML = html;
//     return el.firstElementChild ? el.firstElementChild.textContent : '';
// }
//
// function decodeEntities(str: string): string {
//     const element = document.createElement('div');
//
//     if (str && typeof str === 'string') {
//         str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
//         str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
//         element.innerHTML = str;
//         str = element.textContent;
//         element.textContent = '';
//     }
//
//     return str;
// }
//
// function getMimeType(url: string): string {
//     const regex = /[^.]+$/;
//     const match = regex.exec(url);
//     const ext = match && match.length > 0 && match[0];
//
//     switch (ext) {
//         case 'webm':
//             return 'video/webm';
//         case 'mp4':
//             return 'video/mp4';
//         case 'jpg':
//         case 'jpeg':
//             return 'image/jpeg';
//         case 'png':
//             return 'image/png';
//     }
// }
//
// function getExtension(url: string): string {
//     const regex = /[^.]+$/;
//     const match = regex.exec(url);
//     return match ? match.length > 0 && match[0] : undefined;
// }

export {
    serialize,
    compose,
    // paramsToObject,
    cleanEmptyPropetiesFromObjects,
    // extractHtmlTags,
    // decodeEntities,
    // getMimeType,
    // getExtension
}