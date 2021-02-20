import { READ } from './Constants';

export class TimesPresenter {
    constructor(response) {
        this.response = response;
        this.updated = [];
    }

    async present({ response, code }) {

        switch (code) {
            case READ:
                const result = response.reduce(function(result, item, index) {
                    result['row-group-'+index] = {
                        'row-control': item
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