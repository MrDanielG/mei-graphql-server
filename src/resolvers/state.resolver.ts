import { Context } from '@middlewares/context';
import { State } from '@models/state';
import { StateService } from '@services/state.service';
import { DocumentType } from '@typegoose/typegoose';
import { injectable } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';

@injectable()
@Resolver((_of) => State)
export class StateResolver {
    constructor(private stateSrv: StateService) {}

    @Query(() => [State])
    async states() {
        return this.stateSrv.getAll();
    }

    @Query(() => State, { nullable: true })
    async stateById(@Arg('id') id: string) {
        return this.stateSrv.findWhere({ _id: id });
    }

    @Query(() => State, { nullable: true })
    async stateByName(@Arg('name') name: string) {
        return this.stateSrv.findWhere({ name });
    }

    @FieldResolver()
    async cities(@Root() state: DocumentType<State>, @Ctx() ctx: Context) {
        const citiesLoader = ctx.citiesLoader;
        const cities = await citiesLoader.loadMany(state.cities);
        return cities;
    }
}
