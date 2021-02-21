import mongoose from 'mongoose';
import { READ } from './Constants';
import { Logger } from '@scripty/logger';

export class TimesRepository {

    constructor(requestSchema) {
        delete mongoose.connection.models['times'];
        let Schema = new mongoose.Schema(requestSchema, {timestamps: true});
        this.model = mongoose.model('times', Schema);
    }

    async read(query = {}, presenter) {
        try {
            const response = await this.model.aggregate([
                {$project: {
                    id: 1,
                    datum: 1,
                    start: 1,
                    stop: 1,
                    pause:  { $toDouble: "$pause" },
                    ist: { $toDouble: "$ist" },
                    krank: 1,
                    urlaub: 1,
                    ueberstunden: 1,
                    konferenz: 1,
                    month: {$month: '$datum'},
                    year: {$year: '$datum'}
                }},
                {$match: {month: parseInt(query.month), year: parseInt(query.year)}},
                {$project: {
                    id: 1,
                    datum: 1,
                    start: 1,
                    stop: 1,
                    pause: 1,
                    ist: 1,
                    krank: 1,
                    urlaub: 1,
                    ueberstunden: 1,
                    konferenz: 1
                }}
            ]);
            return presenter.present({ code: READ, response })
        } catch (e) {
            Logger.error(e)
        }
    };

    async update(data = {}, presenter) {
        let { _id, ...restProps } = data;

        if (!_id) {
            _id = new mongoose.mongo.ObjectID()
        }

        try {
            return await this.model.findOneAndUpdate(
                { _id },
                { ...restProps },
                { new: true, upsert: true }
            );
        } catch (e) {
            Logger.error(e)
        }
    };

    async destroy(data, presenter) {
        let { _id } = data;
        console.log(_id, ' <------------ _id  --------------');

        try {
            return await this.model.findOneAndRemove({ _id: _id });
        } catch (e) {
            Logger.error(e)
        }
    };
}