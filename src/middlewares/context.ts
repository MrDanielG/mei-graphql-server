import { User } from '@models/user';
import { BaseModelService } from '@services';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

export interface Context {
    req: Request;
    res?: Response;
    user?: User;
}

@injectable()
export class ContextFactory {
    constructor() {}

    private _createFetcher<T>(modelSrv: BaseModelService<T>) {
        return (keys: readonly string[]) => {
            const mKeys = Array.from(keys);
            return modelSrv.getAllIn(mKeys);
        };
    }

    public createContext(req: Request, res?: Response): Context {
        return { req, res };
    }
}
