import { Context } from '@middlewares/context';
import { UserRecom, UserRecomDataInput } from '@models/userRecom';
import { UserRecomService } from '@services/userRecom.service';
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
@Resolver((_of) => UserRecom)
export class UserRecomResolver {
    constructor(private userRecomSrv: UserRecomService) {}

    @Query(() => [UserRecom])
    async userRecoms() {
        return this.userRecomSrv.getAll();
    }

    @Query(() => UserRecom, { nullable: true })
    async userRecomsById(@Arg('id') id: string) {
        return this.userRecomSrv.findWhere({ _id: id });
    }

    @Query(() => [UserRecom], { nullable: true })
    async userRecomsByUser(@Arg('userId') userId: string) {
        return this.userRecomSrv.search(userId);
    }

    @Mutation(() => UserRecom)
    async addUserRecom(
        @Arg('data') newUserRecomData: UserRecomDataInput
    ): Promise<UserRecom> {
        return this.userRecomSrv.add(newUserRecomData);
    }

    @Mutation(() => UserRecom)
    async updateUserRecom(
        @Arg('id') id: string,
        @Arg('data') data: UserRecomDataInput
    ): Promise<UserRecom> {
        return this.userRecomSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delUserRecomById(@Arg('id') id: string): Promise<number> {
        const res = await this.userRecomSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }

    @Mutation(() => Int)
    async delUserRecomByUser(@Arg('id') userId: string): Promise<number> {
        const res = await this.userRecomSrv.delWhere({ user: userId });
        return res.deletedCount || 0;
    }

    @FieldResolver()
    async user(
        @Root() userRecom: DocumentType<UserRecom>,
        @Ctx() ctx: Context
    ) {
        const userId = userRecom.user.toString() || '';
        const user = await ctx.usersLoader.load(userId);
        return user;
    }

    @FieldResolver()
    async schools(
        @Root() userRecom: DocumentType<UserRecom>,
        @Ctx() ctx: Context
    ) {
        if (!userRecom.schools) return 0;
        const schoolsLoader = ctx.schoolsLoader;
        const schools = await schoolsLoader.loadMany(userRecom.schools);
        return schools;
    }
}
