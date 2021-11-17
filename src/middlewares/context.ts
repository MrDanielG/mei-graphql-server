import { City } from '@models/city';
import { State } from '@models/state';
import { User } from '@models/user';
import { BaseModelService } from '@services';
import { CityService } from '@services/city.service';
import { StateService } from '@services/state.service';
import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

export interface Context {
    statesLoader: DataLoader<string, State>;
    citiesLoader: DataLoader<string, City>;
    req: Request;
    res?: Response;
    user?: User;
}

@injectable()
export class ContextFactory {
    constructor(private stateSrv: StateService, private citySrv: CityService) {}

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
            req,
            res,
        };
    }
}
