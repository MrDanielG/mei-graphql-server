import { Context } from '@middlewares/context';
import { School, SchoolDataInput } from '@models/school';
import { SchoolService } from '@services/school.service';
import { DocumentType } from '@typegoose/typegoose';
import { injectable } from 'tsyringe';
import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';

@injectable()
@Resolver((_of) => School)
export class SchoolResolver {
    constructor(private schoolSrv: SchoolService) {}

    @Query(() => [School])
    async schools() {
        return this.schoolSrv.getAll();
    }

    @Query(() => School, { nullable: true })
    async schoolById(@Arg('id') id: string) {
        return this.schoolSrv.findWhere({ _id: id });
    }

    @Query(() => School, { nullable: true })
    async schoolByName(@Arg('name') name: string) {
        return this.schoolSrv.findWhere({ name });
    }

    @Mutation(() => School)
    async addSchool(@Arg('data') data: SchoolDataInput): Promise<School> {
        return this.schoolSrv.add(data);
    }

    @Mutation(() => School)
    async updateSchool(
        @Arg('id') id: string,
        @Arg('data') data: SchoolDataInput
    ): Promise<School> {
        return this.schoolSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delSchoolById(@Arg('id') id: string): Promise<number> {
        const res = await this.schoolSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }

    @FieldResolver()
    async state(@Root() school: DocumentType<School>, @Ctx() ctx: Context) {
        const stateId = school.state.toString() || '';
        const state = await ctx.statesLoader.load(stateId);
        return state;
    }

    @FieldResolver()
    async city(@Root() school: DocumentType<School>, @Ctx() ctx: Context) {
        const cityId = school.city.toString() || '';
        const city = await ctx.citiesLoader.load(cityId);
        return city;
    }
}
