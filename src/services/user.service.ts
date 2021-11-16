import { User, UserModel, UserModelType } from '@models/user';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([{ token: UserService, useValue: new UserService(UserModel) }])
export class UserService extends BaseModelService<User> {
    constructor(model: UserModelType) {
        super(model);
    }
}
