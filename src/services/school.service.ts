import { School, SchoolModel, SchoolModelType } from '@models/school';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([{ token: SchoolService, useValue: new SchoolService(SchoolModel) }])
export class SchoolService extends BaseModelService<School> {
    constructor(model: SchoolModelType) {
        super(model);
    }
}
