import { Answer } from '@models/answer';
import { City } from '@models/city';
import { Question } from '@models/question';
import { Quiz } from '@models/quiz';
import { School } from '@models/school';
import { State } from '@models/state';
import { User } from '@models/user';
import { BaseModelService, UserService } from '@services';
import { AnswerService } from '@services/answer.service';
import { CityService } from '@services/city.service';
import { QuestionService } from '@services/question.service';
import { QuizService } from '@services/quiz.service';
import { SchoolService } from '@services/school.service';
import { StateService } from '@services/state.service';
import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

export interface Context {
    usersLoader: DataLoader<string, User>;
    statesLoader: DataLoader<string, State>;
    citiesLoader: DataLoader<string, City>;
    schoolsLoader: DataLoader<string, School>;
    quizzesLoader: DataLoader<string, Quiz>;
    questionsLoader: DataLoader<string, Question>;
    answersLoader: DataLoader<string, Answer>;
    req: Request;
    res?: Response;
    user?: User;
}

@injectable()
export class ContextFactory {
    constructor(
        private userSrv: UserService,
        private stateSrv: StateService,
        private citySrv: CityService,
        private schoolSrv: SchoolService,
        private quizSrv: QuizService,
        private questionSrv: QuestionService,
        private answerSrv: AnswerService
    ) {}

    private _createFetcher<T>(modelSrv: BaseModelService<T>) {
        return (keys: readonly string[]) => {
            const mKeys = Array.from(keys);
            return modelSrv.getAllIn(mKeys);
        };
    }

    public createContext(req: Request, res?: Response): Context {
        return {
            usersLoader: new DataLoader<string, User>(
                this._createFetcher(this.userSrv)
            ),
            statesLoader: new DataLoader<string, State>(
                this._createFetcher(this.stateSrv)
            ),
            citiesLoader: new DataLoader<string, City>(
                this._createFetcher(this.citySrv)
            ),
            schoolsLoader: new DataLoader<string, School>(
                this._createFetcher(this.schoolSrv)
            ),
            quizzesLoader: new DataLoader<string, Quiz>(
                this._createFetcher(this.quizSrv)
            ),
            questionsLoader: new DataLoader<string, Question>(
                this._createFetcher(this.questionSrv)
            ),
            answersLoader: new DataLoader<string, Answer>(
                this._createFetcher(this.answerSrv)
            ),
            req,
            res,
        };
    }
}
