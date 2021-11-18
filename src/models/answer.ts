import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { CarreerArea } from './enums/carreerAreas';

@ObjectType({ description: 'User profile data.' })
export class Answer {
    @Field()
    readonly _id: string;

    @Field()
    @prop()
    label: string;

    @Field(() => CarreerArea)
    @prop({ enum: CarreerArea, type: String })
    value: CarreerArea;
}

@InputType({
    description: 'An Answer to a Question',
})
export class AnswerDataInput implements Partial<Answer> {
    @Field()
    label: string;

    @Field(() => CarreerArea)
    value: CarreerArea;
}

export const AnswerModel = getModelForClass(Answer);
export type AnswerModelType = typeof AnswerModel;
