import mongoose from 'mongoose';
import { singleton } from 'tsyringe';

@singleton()
export class DBService {
    constructor() {
        const conn = mongoose.connection;
        conn.on('error', console.error.bind(console, 'connection error'));
        conn.once('open', () => {
            console.info(
                `🧩 Connected to ${conn.db.databaseName} database at ${conn.host}:${conn.port}`
            );
        });
    }

    public async start() {
        const url = process.env.MONGODB_URL;
        if (url === undefined) {
            throw new Error('MONGODB_URL must be provided!');
        }
        try {
            await mongoose.connect(url);
        } catch (err) {
            console.error(err);
        }
    }
}
