import { default as params } from '@params';

class PathLocalStorage {
    private prefix: string = 'hbs:';

    constructor(public baseURL: string){
        if (baseURL.substring(0, 2) === '//') {
            baseURL = 'http:' + baseURL;
        }
        let url: URL;
        try {
            url = new URL(baseURL);
        } catch (e) {
            url = new URL(baseURL, location.protocol + '//' + location.host);
        }
        let pathname = url.pathname.replace(/^(\/+)/, '').replace(/(\/+)$/, '')
        if (pathname !== '') {
            this.prefix +=  pathname.replace('/', '-') + ':'
        }
    }

    getItem(key: string): string | null {
        return localStorage.getItem(this.prefix + key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(this.prefix + key, value);
    }

    removeItem(key: string): void {
        localStorage.removeItem(this.prefix + key);
    }
}

let baseURL = params.baseURL;
export default new PathLocalStorage(baseURL);
