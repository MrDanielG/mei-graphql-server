import { Answer, AnswerModel, AnswerModelType } from '@models/answer';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([{ token: AnswerService, useValue: new AnswerService(AnswerModel) }])
export class AnswerService extends BaseModelService<Answer> {
    constructor(model: AnswerModelType) {
        super(model);
    }
}
