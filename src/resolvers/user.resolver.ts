import { User, UserDataInput } from '@models/user';
import { UserService } from '@services';
import { injectable } from 'tsyringe';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';

@injectable()
@Resolver((_of) => User)
export class UserResolver {
    constructor(private userSrv: UserService) {}

    @Query(() => [User])
    async users() {
        return this.userSrv.getAll();
    }

    @Query(() => User, { nullable: true })
    async userById(@Arg('id') id: string) {
        return this.userSrv.findWhere({ _id: id });
    }

    @Query(() => User, { nullable: true })
    async userByEmail(@Arg('email') email: string) {
        return this.userSrv.findWhere({ email: email });
    }

    @Mutation(() => User)
    async addUser(@Arg('data') newUserData: UserDataInput): Promise<User> {
        return this.userSrv.add(newUserData);
    }

    @Mutation(() => User)
    async updateUser(
        @Arg('id') id: string,
        @Arg('data') data: UserDataInput
    ): Promise<User> {
        return this.userSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delUserById(@Arg('id') id: string): Promise<number> {
        const res = await this.userSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }

    @Mutation(() => Int)
    async delUserByEmail(@Arg('email') email: string): Promise<number> {
        const res = await this.userSrv.delWhere({ email: email });
        return res.deletedCount || 0;
    }
}
