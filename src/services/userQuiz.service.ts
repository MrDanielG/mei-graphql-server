import { UserQuiz, UserQuizModel, UserQuizModelType } from '@models/userQuiz';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([
    { token: UserQuizService, useValue: new UserQuizService(UserQuizModel) },
])
export class UserQuizService extends BaseModelService<UserQuiz> {
    constructor(model: UserQuizModelType) {
        super(model);
    }
}
