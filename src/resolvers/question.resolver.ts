import { Context } from '@middlewares/context';
import { Question, QuestionDataInput } from '@models/question';
import { QuestionService } from '@services/question.service';
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
@Resolver((_of) => Question)
export class QuestionResolver {
    constructor(private questionSrv: QuestionService) {}

    @Query(() => [Question])
    async questions() {
        return this.questionSrv.getAll();
    }

    @Query(() => Question, { nullable: true })
    async questionById(@Arg('id') id: string) {
        return this.questionSrv.findWhere({ _id: id });
    }

    @Query(() => Question, { nullable: true })
    async questionByLabel(@Arg('label') label: string) {
        return this.questionSrv.findWhere({ label });
    }

    @Mutation(() => Question)
    async addQuestion(
        @Arg('data') newQuestionData: QuestionDataInput
    ): Promise<Question> {
        return this.questionSrv.add(newQuestionData);
    }

    @Mutation(() => Question)
    async updateQuestion(
        @Arg('id') id: string,
        @Arg('data') data: QuestionDataInput
    ): Promise<Question> {
        return this.questionSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delQuestionById(@Arg('id') id: string): Promise<number> {
        const res = await this.questionSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }

    @Mutation(() => Int)
    async delQuestionByLabel(@Arg('label') label: string): Promise<number> {
        const res = await this.questionSrv.delWhere({ label });
        return res.deletedCount || 0;
    }

    @FieldResolver()
    async quiz(@Root() question: DocumentType<Question>, @Ctx() ctx: Context) {
        const quizId = question.quiz.toString() || '';
        const quiz = await ctx.quizzesLoader.load(quizId);
        return quiz;
    }

    @FieldResolver()
    async answers(
        @Root() question: DocumentType<Question>,
        @Ctx() ctx: Context
    ) {
        const answersLoader = ctx.answersLoader;
        const answers = await answersLoader.loadMany(question.answers);
        return answers;
    }
}
