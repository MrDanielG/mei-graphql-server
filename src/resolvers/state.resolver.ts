import { State } from '@models/state';
import { StateService } from '@services/state.service';
import { injectable } from 'tsyringe';
import { Arg, Query, Resolver } from 'type-graphql';

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
}
