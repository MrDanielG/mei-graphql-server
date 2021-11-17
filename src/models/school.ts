import { City } from '@models/city';
import { State } from '@models/state';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType({ description: 'School Data' })
export class School {
    @Field()
    readonly _id: string;

    @Field()
    @prop()
    name: string;

    @Field()
    @prop()
    description: string;

    @Field()
    @prop()
    picture_url: string;

    @prop({ type: () => String })
    @Field(() => State)
    state: string;

    @prop({ type: () => String })
    @Field(() => City)
    city: string;
}

@InputType({
    description: 'Partial School data used as query or mutation input',
})
export class SchoolDataInput implements Partial<School> {
    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    description: string;

    @Field({ nullable: false })
    picture_url: string;

    @Field({ nullable: false })
    state: string;

    @Field({ nullable: false })
    city: string;
}

export const SchoolModel = getModelForClass(School);
export type SchoolModelType = typeof SchoolModel;
