import {
    UserRecom,
    UserRecomModel,
    UserRecomModelType,
} from '@models/userRecom';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([
    {
        token: UserRecomService,
        useValue: new UserRecomService(UserRecomModel),
    },
])
export class UserRecomService extends BaseModelService<UserRecom> {
    constructor(model: UserRecomModelType) {
        super(model);
    }
}
