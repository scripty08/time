import { Logger } from '@scripty/logger';
import { BaseRepository } from '../../../BaseRepository';

export default class Repository extends BaseRepository {

    constructor(Schema) {
        super('mocks', Schema)
    }

    async destroy(query) {
        try {
            await this.model.findOneAndRemove({ _id: query._id });
        } catch (e) {
            Logger.error(e)
        }
    };
}
