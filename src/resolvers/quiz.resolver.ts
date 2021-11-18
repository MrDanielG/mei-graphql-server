import { Context } from '@middlewares/context';
import { Quiz, QuizDataInput } from '@models/quiz';
import { QuizService } from '@services/quiz.service';
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
@Resolver((_of) => Quiz)
export class QuizResolver {
    constructor(private quizSrv: QuizService) {}

    @Query(() => [Quiz])
    async quizes() {
        return this.quizSrv.getAll();
    }

    @Query(() => Quiz, { nullable: true })
    async quizById(@Arg('id') id: string) {
        return this.quizSrv.findWhere({ _id: id });
    }

    @Query(() => Quiz, { nullable: true })
    async quizByCategory(@Arg('category') category: string) {
        return this.quizSrv.findWhere({ category });
    }

    @Mutation(() => Quiz)
    async addQuiz(@Arg('data') newQuizData: QuizDataInput): Promise<Quiz> {
        return this.quizSrv.add(newQuizData);
    }

    @Mutation(() => Quiz)
    async updateQuiz(
        @Arg('id') id: string,
        @Arg('data') data: QuizDataInput
    ): Promise<Quiz> {
        return this.quizSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delQuizById(@Arg('id') id: string): Promise<number> {
        const res = await this.quizSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }

    @Mutation(() => Int)
    async delQuizByCategory(
        @Arg('category') category: string
    ): Promise<number> {
        const res = await this.quizSrv.delWhere({ label: category });
        return res.deletedCount || 0;
    }

    @FieldResolver()
    async questions(@Root() quiz: DocumentType<Quiz>, @Ctx() ctx: Context) {
        const questionsLoader = ctx.questionsLoader;
        if (!quiz.questions) return 0;
        const questions = await questionsLoader.loadMany(quiz.questions);
        return questions;
    }
}
