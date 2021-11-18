import { Quiz } from '@models/quiz';
import { User } from '@models/user';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { CarreerArea } from './enums/carreerAreas';

@ObjectType({ description: 'Quiz done by an User' })
export class UserQuiz {
    @Field()
    readonly _id: string;

    @Field(() => CarreerArea)
    @prop({ enum: CarreerArea, type: String })
    result: CarreerArea;

    @prop({ type: () => String })
    @Field(() => Quiz)
    quiz: string;

    @prop({ type: () => String })
    @Field(() => User)
    user: string;
}

@InputType({
    description: 'Partial UserQuiz data used as query or mutation Input',
})
export class UserQuizDataInput implements Partial<UserQuiz> {
    @Field(() => CarreerArea)
    result: CarreerArea;

    @Field()
    quiz: string;

    @Field()
    user: string;
}

export const UserQuizModel = getModelForClass(UserQuiz);
export type UserQuizModelType = typeof UserQuizModel;
