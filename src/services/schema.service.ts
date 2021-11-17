import { ContextFactory } from '@middlewares/context';
import { CityResolver } from '@resolvers/city.resolver';
import { StateResolver } from '@resolvers/state.resolver';
import { UserResolver } from '@resolvers/user.resolver';
import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { createServer } from 'http';
import { container, injectable } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import { DBService } from './db.service';

@injectable()
export class SchemaService {
    private apolloServer: ApolloServer;
    private app: Express;

    constructor(private db: DBService, private ctxFactory: ContextFactory) {}

    public async start() {
        await this.db.start();

        const schema = await buildSchema({
            resolvers: [UserResolver, StateResolver, CityResolver],
            container: { get: (theClass) => container.resolve(theClass) },
        });

        this.apolloServer = new ApolloServer({
            schema,
            context: ({ req, res }) => this.ctxFactory.createContext(req, res),
        });

        const port = process.env.PORT || 4000;
        const path = '/graphql';
        this.app = express();

        const httpServer = createServer(this.app);
        await this.apolloServer.start();
        this.apolloServer.applyMiddleware({ app: this.app, path });

        await new Promise<void>((res) => httpServer.listen({ port }, res));
        console.info(
            `🚀 Server ready at http://localhost:${port}${this.apolloServer.graphqlPath}`
        );
    }
}
