/* eslint-disable @typescript-eslint/ban-types */
export interface IModelCRUD<T, DelResponseType, IDType = string> {
    exists(filter: Object): Promise<boolean>;
    getAll(): Promise<T[]>;
    findAndPopulate(filter: Object, paths: string[]): Promise<T>;
    getAllIn(ids: IDType[]): Promise<T[]>;
    delWhere(filter: Object): Promise<DelResponseType>;
    add(data: Object): Promise<T>;
    addMany(data: Object[]): Promise<T[]>;
    findWhere(filter: Object): Promise<T>;
    update(id: IDType, data: Object): Promise<T>;
}
