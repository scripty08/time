import { Logger } from '@scripty/logger';
import { BaseRepository } from '../../../BaseRepository';

export default class Repository extends BaseRepository {

    constructor(Schema) {
        super('mocks', Schema)
    }

    async findOne(query) {
        try {
            const response = await this.model.findOne({_id: query.id});
            return { response };

        } catch (e) {
            Logger.error(e)
        }
    };
}
