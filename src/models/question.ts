import { Quiz } from '@models/quiz';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Answer } from './answer';

@ObjectType({ description: 'Question of a Quiz' })
export class Question {
    @Field()
    readonly _id: string;

    @Field()
    @prop()
    label: string;

    @prop({ type: () => [String] })
    @Field(() => [Answer], {
        description: 'List of Answers related to this Question',
    })
    answers: string[];

    @prop({ type: () => String })
    @Field(() => Quiz, { description: 'Quiz where this question is from' })
    quiz: string;
}

@InputType({
    description: 'Partial user data used as query or mutation input.',
})
export class QuestionDataInput implements Partial<Question> {
    @Field()
    label: string;

    @Field(() => [String])
    answers: string[];

    @Field()
    quiz: string;
}

export const QuestionModel = getModelForClass(Question);
export type QuestionModelType = typeof QuestionModel;
