import { READ } from './Constants';
import moment from 'moment';

export class TimesPresenter {
    constructor(response) {
        this.response = response;
        this.updated = [];
    }

    async present({ response, code }) {

        switch (code) {
            case READ:
                const result = response.reduce(function(result, item, index) {
                    const date = moment(item.datum).format('DD.MM.YYYY');
                    result['row-group-'+date] = {
                        ['row-control']: item
                    };
                    return result;
                }, {});
                this.response.send({
                    updated: this.updated,
                    entries: result
                });
                break;
        }
    };

    setUpdated(updated) {
        this.updated = updated;
    };
}