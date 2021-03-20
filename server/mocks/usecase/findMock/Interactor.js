export default class Interactor {

    constructor(request, repository, presenter) {
        this.req = request;
        this.repository = repository;
        this.presenter = presenter;
    }

    async run() {
        const url = this.req.url.replace('/api/mock', '');
        const response = await this.repository.findOne({ path: url });
        return await this.presenter.present({ ...response });
    }
}
