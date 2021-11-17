import { Context } from '@middlewares/context';
import { Carreer, CarreerDataInput } from '@models/carreer';
import { CarreerService } from '@services/carreer.service';
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
@Resolver((_of) => Carreer)
export class CarreerResolver {
    constructor(private carreerSrv: CarreerService) {}

    @Query(() => [Carreer])
    async carreers() {
        return this.carreerSrv.getAll();
    }

    @Query(() => Carreer, { nullable: true })
    async carreerById(@Arg('id') id: string) {
        return this.carreerSrv.findWhere({ _id: id });
    }

    @Query(() => Carreer, { nullable: true })
    async carreerByName(@Arg('name') name: string) {
        return this.carreerSrv.findWhere({ name });
    }

    //     @Query(() => [Carreer], { nullable: true })
    //     async carreerBySchoolId(@Arg('id') id: string) {
    //         return this.carreerSrv.search(`school: ${id}`);
    //     }

    @FieldResolver()
    async school(@Root() carreer: DocumentType<Carreer>, @Ctx() ctx: Context) {
        const schoolId = carreer.school.toString() || '';
        const school = await ctx.schoolsLoader.load(schoolId);
        return school;
    }

    @Mutation(() => Carreer)
    async addCarreer(
        @Arg('data') newCarreerData: CarreerDataInput
    ): Promise<Carreer> {
        return this.carreerSrv.add(newCarreerData);
    }

    @Mutation(() => Carreer)
    async updateCarreer(
        @Arg('id') id: string,
        @Arg('data') data: CarreerDataInput
    ): Promise<Carreer> {
        return this.carreerSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delCarreerById(@Arg('id') id: string): Promise<number> {
        const res = await this.carreerSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }
}
