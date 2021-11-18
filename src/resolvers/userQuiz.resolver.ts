import { Context } from '@middlewares/context';
import { UserQuiz, UserQuizDataInput } from '@models/userQuiz';
import { UserQuizService } from '@services/userQuiz.service';
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
@Resolver((_of) => UserQuiz)
export class UserQuizResolver {
    constructor(private userQuizSrv: UserQuizService) {}

    @Query(() => [UserQuiz])
    async userQuizzes() {
        return this.userQuizSrv.getAll();
    }

    @Query(() => UserQuiz, { nullable: true })
    async userQuizById(@Arg('id') id: string) {
        return this.userQuizSrv.findWhere({ _id: id });
    }

    @Query(() => [UserQuiz], { nullable: true })
    async userQuizzesByResult(@Arg('result') result: string) {
        return this.userQuizSrv.search(result);
    }

    @Mutation(() => UserQuiz)
    async addUserQuiz(
        @Arg('data') newUserQuizData: UserQuizDataInput
    ): Promise<UserQuiz> {
        return this.userQuizSrv.add(newUserQuizData);
    }

    @Mutation(() => UserQuiz)
    async updateUserQuiz(
        @Arg('id') id: string,
        @Arg('data') data: UserQuizDataInput
    ): Promise<UserQuiz> {
        return this.userQuizSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delUserQuizById(@Arg('id') id: string): Promise<number> {
        const res = await this.userQuizSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }

    @Mutation(() => Int)
    async delUserQuizByUser(@Arg('id') userId: string): Promise<number> {
        const res = await this.userQuizSrv.delWhere({ user: userId });
        return res.deletedCount || 0;
    }

    @FieldResolver()
    async quiz(@Root() userQuiz: DocumentType<UserQuiz>, @Ctx() ctx: Context) {
        const quizId = userQuiz.quiz.toString() || '';
        console.log('QuizId: ', quizId);
        const quiz = await ctx.quizzesLoader.load(quizId);
        return quiz;
    }

    @FieldResolver()
    async user(@Root() userQuiz: DocumentType<UserQuiz>, @Ctx() ctx: Context) {
        const userId = userQuiz.user.toString() || '';
        const user = await ctx.usersLoader.load(userId);
        return user;
    }
}
