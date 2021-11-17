import { City } from '@models/city';
import { CityService } from '@services/city.service';
import { injectable } from 'tsyringe';
import { Arg, Query, Resolver } from 'type-graphql';

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
}
