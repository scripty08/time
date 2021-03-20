export default class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present({ response }) {
        this.response.send({
            ...response._doc
        });
    };
}
