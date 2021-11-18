import { Question } from '@models/question';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Vocational Quiz' })
export class Quiz {
    @Field()
    readonly _id: string;

    @Field()
    @prop()
    category: string;

    @prop({ type: () => [String] })
    @Field(() => [Question], {
        description: 'List of Questions related to this Quiz',
    })
    questions?: string[];
}

@InputType({
    description: 'Partial Quiz data used as query or mutation input.',
})
export class QuizDataInput implements Partial<Quiz> {
    @Field({ nullable: true })
    category: string;

    @Field(() => [String], { nullable: true })
    questions: string[];
}

export const QuizModel = getModelForClass(Quiz);
export type QuizModelType = typeof QuizModel;
