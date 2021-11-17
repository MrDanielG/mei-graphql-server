import { School } from '@models/school';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { CarreerArea } from './enums/carreerAreas';

@ObjectType({ description: 'Carrer profile data.' })
export class Carreer {
    @Field()
    readonly _id: string;

    @Field()
    @prop()
    name: string;

    @Field(() => CarreerArea)
    @prop({ enum: CarreerArea, type: String })
    area: CarreerArea;

    @Field()
    @prop()
    admissionProfile: string;

    @Field()
    @prop()
    graduateProfile: string;

    @Field()
    @prop()
    workField: string;

    @Field()
    @prop()
    picture_url: string;

    @Field(() => School, {
        description: 'The school where this carrer is available',
    })
    @prop({ type: () => String })
    school: string;

    @Field(() => Int)
    @prop()
    likes: number;
}

@InputType({
    description: 'Partial Carreer data used as query or mutation input.',
})
export class CarreerDataInput implements Partial<Carreer> {
    @Field({ nullable: false })
    name: string;

    @Field(() => CarreerArea, { nullable: false })
    area: CarreerArea;

    @Field({ nullable: false })
    admissionProfile: string;

    @Field({ nullable: false })
    graduateProfile: string;

    @Field({ nullable: false })
    workField: string;

    @Field({ nullable: false })
    picture_url: string;

    @Field({ nullable: false })
    school: string;

    @Field({ nullable: true })
    likes: number = 0;
}

export const CarreerModel = getModelForClass(Carreer);
export type CarreerModelType = typeof CarreerModel;
