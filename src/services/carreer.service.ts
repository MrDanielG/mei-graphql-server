import { Carreer, CarreerModel, CarreerModelType } from '@models/carreer';
import { injectable, registry } from 'tsyringe';
import { BaseModelService } from './basemodel.service';

@injectable()
@registry([
    { token: CarreerService, useValue: new CarreerService(CarreerModel) },
])
export class CarreerService extends BaseModelService<Carreer> {
    constructor(model: CarreerModelType) {
        super(model);
    }
}
