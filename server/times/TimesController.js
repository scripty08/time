import { TimesSchema } from './TimesSchema';
import { TimesRepository } from './TimesRepository';
import { TimesPresenter } from './TimesPresenter';

export class TimesController {

    async init(server, router) {
        router.get('/api/times/read', this.readAction.bind(this));
        router.get('/api/times/destroy', this.destroyAction.bind(this));
        router.post('/api/times/update', this.updateAction.bind(this));
        server.use(router);
    }

    async readAction(req, res) {
        const presenter = new TimesPresenter(res);
        const repository = new TimesRepository(TimesSchema);
        return repository.read(req.query, presenter)
    };

    async updateAction(req, res) {
        const presenter = new TimesPresenter(res);
        const repository = new TimesRepository(TimesSchema);

        req.body.forEach((rec) => {
            repository.update(rec, presenter)
        });
    };
    async destroyAction(req, res) {
        const presenter = new TimesPresenter(res);
        const repository = new TimesRepository(TimesSchema);
        return repository.destroy(req.query, presenter)
    };
}