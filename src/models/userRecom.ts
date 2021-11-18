import { School } from '@models/school';
import { User } from '@models/user';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Schools recomendations to User' })
export class UserRecom {
    @Field()
    readonly _id: string;

    @prop({ type: () => String })
    @Field(() => User)
    user: string;

    @prop({ type: () => [String] })
    @Field(() => [School], {
        description: 'List of the School ids recommended to this User',
    })
    schools?: string[];
}

@InputType({
    description: 'Partial UserSchools data used as query or mutation Input',
})
export class UserRecomDataInput implements Partial<UserRecom> {
    @Field()
    user: string;

    @Field(() => [String], { nullable: true })
    schools: string[];
}

export const UserRecomModel = getModelForClass(UserRecom);
export type UserRecomModelType = typeof UserRecomModel;
