import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType({ description: 'User profile data.' })
export class User {
    @Field()
    readonly _id: string;

    @Field()
    @prop()
    name: string;

    @Field()
    @prop()
    lastName: string;

    @Field()
    @prop()
    email: string;

    @Field()
    @prop()
    password: string;

    @Field()
    @prop()
    picture_url: string;
}

@InputType({
    description: 'Partial user data used as query or mutation input.',
})
export class UserDataInput implements Partial<User> {
    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    lastName: string;

    @Field({ nullable: false })
    email: string;

    @Field({ nullable: false })
    password: string;

    @Field({ nullable: false })
    picture_url: string;
}

export const UserModel = getModelForClass(User);
export type UserModelType = typeof UserModel;
