import { Quiz, QuizModel, QuizModelType } from '@models/quiz';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([{ token: QuizService, useValue: new QuizService(QuizModel) }])
export class QuizService extends BaseModelService<Quiz> {
    constructor(model: QuizModelType) {
        super(model);
    }
}
