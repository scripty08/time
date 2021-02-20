import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { TimesSchema } from './TimesSchema';
import { TimesRepository } from './TimesRepository';
import { TimesPresenter } from './TimesPresenter';

export class TimesController {

    async init(server, router) {
        router.get('/api/times/read', this.readAction.bind(this));
        server.use(router);
    }

    async readAction(req, res) {
        const presenter = new TimesPresenter(res);
        const repository = new TimesRepository(TimesSchema);
        return repository.read(req.query, presenter)
    };

}