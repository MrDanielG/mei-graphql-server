import { IModelCRUD } from '@services/interfaces';
import {
    AnyParamConstructor,
    DocumentType,
    ReturnModelType,
} from '@typegoose/typegoose/lib/types';
import { FilterQuery, UpdateQuery } from 'mongoose';

export type delResponse = {
    ok?: number | undefined;
    n?: number | undefined;
} & {
    deletedCount?: number | undefined;
};

type Filter<T> = FilterQuery<DocumentType<T>>;
type UpdateQueryData<T> = UpdateQuery<DocumentType<T>>;

export abstract class BaseModelService<T>
    implements IModelCRUD<DocumentType<T>, delResponse>
{
    constructor(protected model: ReturnModelType<AnyParamConstructor<T>>) {}

    async exists(filter: Filter<T>): Promise<boolean> {
        return this.model.exists(filter);
    }
    async getAll() {
        return this.model.find().exec() as Promise<DocumentType<T>[]>;
    }
    private _populate(spath: string[]): any {
        const reversed = spath.filter((e) => e !== '').reverse();
        const p = reversed.pop();
        if (p !== undefined && reversed.length > 0) {
            return { path: p, populate: this._populate(reversed.reverse()) };
        }
        return { path: p };
    }
    async findAndPopulate(filter: Filter<T>, paths: string[]) {
        const options = paths.map((path) => {
            return this._populate(path.split('.'));
        });
        return this.model.findOne(filter).populate(options).exec() as Promise<
            DocumentType<T>
        >;
    }

    async delWhere(filter: Filter<T>) {
        return this.model.deleteOne(filter).exec();
    }
    async add(data: Partial<T>) {
        return this.model.create(data) as Promise<DocumentType<T>>;
    }
    async addMany(data: Partial<T>[]) {
        return this.model.create(data) as Promise<DocumentType<T>[]>;
    }
    async findWhere(filter: Filter<T>) {
        return this.model.findOne(filter).exec() as Promise<DocumentType<T>>;
    }

    async search(searchTerms: string) {
        const filter: Filter<any> = { $text: { $search: searchTerms } };
        return this.model.find(filter).exec() as Promise<DocumentType<T>[]>;
    }
    async update(id: string, updateQuery: UpdateQueryData<T>) {
        return this.model
            .findByIdAndUpdate(id, updateQuery, { new: true, upsert: true })
            .exec() as Promise<DocumentType<T>>;
    }

    async updateMany(filter: Filter<T>, updateQuery: UpdateQueryData<T>) {
        return this.model
            .updateMany(filter, updateQuery, { multi: true })
            .exec();
    }
    async getAllIn(ids: string[]) {
        const foo = await this.model.find().where('_id').in(ids).exec();
        const sorted = foo.sort(
            (a, b) =>
                ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
        );
        return sorted as unknown as Promise<DocumentType<T>[]>;
    }
}
