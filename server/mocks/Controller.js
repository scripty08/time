import { Schema } from './Schema';
import SearchPresenter from './usecase/search/Presenter';
import SearchRepository from './usecase/search/Repository';
import SearchInteractor from './usecase/search/Interactor';
import ReadPresenter from './usecase/read/Presenter';
import ReadRepository from './usecase/read/Repository';
import ReadInteractor from './usecase/read/Interactor';
import FindOnePresenter from './usecase/findOne/Presenter';
import FindOneRepository from './usecase/findOne/Repository';
import FindOneInteractor from './usecase/findOne/Interactor';
import FindMockPresenter from './usecase/findMock/Presenter';
import FindMockRepository from './usecase/findMock/Repository';
import FindMockInteractor from './usecase/findMock/Interactor';
import UpdatePresenter from './usecase/update/Presenter';
import UpdateRepository from './usecase/update/Repository';
import UpdateInteractor from './usecase/update/Interactor';
import DestroyPresenter from './usecase/destroy/Presenter';
import DestroyRepository from './usecase/destroy/Repository';
import DestroyInteractor from './usecase/destroy/Interactor';

export class MocksController {

    init(server, router) {
        router.post('/api/search', this.searchAction);
        router.get('/api/read', this.readAction);
        router.get('/api/findOne', this.findOneAction);
        router.post('/api/update', this.updateAction);
        router.post('/api/destroy', this.destroyAction);
        router.get('/api/mock/*', this.findMock);
        router.post('/api/mock/*', this.findMock);
        server.use(router);
    }


    searchAction(req, res) {
        const presenter = new SearchPresenter(res);
        const repository = new SearchRepository(Schema);
        const interactor = new SearchInteractor(req, repository, presenter);
        return interactor.run()
    }

    readAction(req, res) {
        const presenter = new ReadPresenter(res);
        const repository = new ReadRepository(Schema);
        const interactor = new ReadInteractor(req, repository, presenter);
        return interactor.run()
    }

    findOneAction(req, res) {
        const presenter = new FindOnePresenter(res);
        const repository = new FindOneRepository(Schema);
        const interactor = new FindOneInteractor(req, repository, presenter);
        return interactor.run()
    }

    findMock(req, res) {
        const presenter = new FindMockPresenter(res);
        const repository = new FindMockRepository(Schema);
        const interactor = new FindMockInteractor(req, repository, presenter);
        return interactor.run()
    }

    updateAction(req, res) {
        const presenter = new UpdatePresenter(res);
        const repository = new UpdateRepository(Schema);
        const readRepository = new ReadRepository(Schema);
        const interactor = new UpdateInteractor(req, repository, readRepository, presenter);
        return interactor.run()
    }

    destroyAction(req, res) {
        const presenter = new DestroyPresenter(res);
        const repository = new DestroyRepository(Schema);
        const readRepository = new ReadRepository(Schema);
        const interactor = new DestroyInteractor(req, repository, readRepository, presenter);
        return interactor.run()
    }
}
