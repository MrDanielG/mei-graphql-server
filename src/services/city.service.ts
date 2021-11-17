import { City, CityModel, CityModelType } from '@models/city';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([{ token: CityService, useValue: new CityService(CityModel) }])
export class CityService extends BaseModelService<City> {
    constructor(model: CityModelType) {
        super(model);
    }
}
