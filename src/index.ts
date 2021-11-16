import 'reflect-metadata';
import { SystemService } from '@services/system.service';
import * as dotenv from 'dotenv';
import { container } from 'tsyringe';

const main = async () => {
    dotenv.config();
    return container.resolve(SystemService).start();
};

main();
