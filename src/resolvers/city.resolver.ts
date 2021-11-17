import { Context } from '@middlewares/context';
import { City } from '@models/city';
import { CityService } from '@services/city.service';
import { DocumentType } from '@typegoose/typegoose';
import { injectable } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';

@injectable()
@Resolver((_of) => City)
export class CityResolver {
    constructor(private citySrv: CityService) {}

    @Query(() => [City])
    async cities() {
        return this.citySrv.getAll();
    }

    @Query(() => City, { nullable: true })
    async cityById(@Arg('id') id: string) {
        return this.citySrv.findWhere({ _id: id });
    }

    @Query(() => City, { nullable: true })
    async cityByName(@Arg('name') name: string) {
        return this.citySrv.findWhere({ name });
    }

    @FieldResolver()
    async state(@Root() city: DocumentType<City>, @Ctx() ctx: Context) {
        const stateId = city.state.toString() || '';
        const state = await ctx.statesLoader.load(stateId);
        return state;
    }
}
