import { Answer, AnswerDataInput } from '@models/answer';
import { AnswerService } from '@services/answer.service';
import { injectable } from 'tsyringe';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';

@injectable()
@Resolver((_of) => Answer)
export class AnswerResolver {
    constructor(private answerSrv: AnswerService) {}

    @Query(() => [Answer])
    async answers() {
        return this.answerSrv.getAll();
    }

    @Query(() => Answer, { nullable: true })
    async answerById(@Arg('id') id: string) {
        return this.answerSrv.findWhere({ _id: id });
    }

    @Query(() => Answer, { nullable: true })
    async answerByLabel(@Arg('label') label: string) {
        return this.answerSrv.findWhere({ label });
    }

    @Mutation(() => Answer)
    async addAnswer(
        @Arg('data') newAnswerData: AnswerDataInput
    ): Promise<Answer> {
        return this.answerSrv.add(newAnswerData);
    }

    @Mutation(() => Answer)
    async updateAnswer(
        @Arg('id') id: string,
        @Arg('data') data: AnswerDataInput
    ): Promise<Answer> {
        return this.answerSrv.update(id, data);
    }

    @Mutation(() => Int)
    async delAnswerById(@Arg('id') id: string): Promise<number> {
        const res = await this.answerSrv.delWhere({ _id: id });
        return res.deletedCount || 0;
    }

    @Mutation(() => Int)
    async delUserByLabel(@Arg('label') label: string): Promise<number> {
        const res = await this.answerSrv.delWhere({ label });
        return res.deletedCount || 0;
    }
}
