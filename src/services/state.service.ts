import { State, StateModel, StateModelType } from '@models/state';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([{ token: StateService, useValue: new StateService(StateModel) }])
export class StateService extends BaseModelService<State> {
    constructor(model: StateModelType) {
        super(model);
    }
}
