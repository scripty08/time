export default class Interactor {

    constructor(request, repository, readRepository, presenter) {
        this.req = request;
        this.repository = repository;
        this.readRepository = readRepository;
        this.presenter = presenter;
    }

    async run() {
        let body = this.req.body;
        const updated = await this.repository.update(body);
        const response = await this.readRepository.read({ current: 1, results: 10 });
        return await this.presenter.present({ ...response, updated })
    }
}
