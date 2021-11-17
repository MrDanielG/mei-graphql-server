import { City } from '@models/city';
import { School } from '@models/school';
import { State } from '@models/state';
import { User } from '@models/user';
import { BaseModelService } from '@services';
import { CityService } from '@services/city.service';
import { SchoolService } from '@services/school.service';
import { StateService } from '@services/state.service';
import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

export interface Context {
    statesLoader: DataLoader<string, State>;
    citiesLoader: DataLoader<string, City>;
    schoolsLoader: DataLoader<string, School>;
    req: Request;
    res?: Response;
    user?: User;
}

@injectable()
export class ContextFactory {
    constructor(
        private stateSrv: StateService,
        private citySrv: CityService,
        private schoolSrv: SchoolService
    ) {}

    private _createFetcher<T>(modelSrv: BaseModelService<T>) {
        return (keys: readonly string[]) => {
            const mKeys = Array.from(keys);
            return modelSrv.getAllIn(mKeys);
        };
    }

    public createContext(req: Request, res?: Response): Context {
        return {
            statesLoader: new DataLoader<string, State>(
                this._createFetcher(this.stateSrv)
            ),
            citiesLoader: new DataLoader<string, City>(
                this._createFetcher(this.citySrv)
            ),
            schoolsLoader: new DataLoader<string, School>(
                this._createFetcher(this.schoolSrv)
            ),
            req,
            res,
        };
    }
}
