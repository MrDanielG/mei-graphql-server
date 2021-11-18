import { Question, QuestionModel, QuestionModelType } from '@models/question';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([
    { token: QuestionService, useValue: new QuestionService(QuestionModel) },
])
export class QuestionService extends BaseModelService<Question> {
    constructor(model: QuestionModelType) {
        super(model);
    }
}
