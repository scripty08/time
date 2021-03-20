import {encodeResponseByContentType} from "../../../helper";

export default class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present({ response }) {
        this.setHeaders(response);
        this.response.set('Content-Type', `${response.contentType};charset=${response.charset}`);
        this.response.status(response.status);
        const result = encodeResponseByContentType(response.contentType, response.body);
        return this.response.json(result);
    };

    setHeaders(response) {
        if (response.headers && response.headers !== '') {
            try {
                const headers = JSON.parse(response.headers);
                Object.keys(headers).forEach((key) => {
                    this.response.set(key, headers[key]);
                })
            } catch (e) {
                console.log('not valid json')
            }
        }
    }
}
