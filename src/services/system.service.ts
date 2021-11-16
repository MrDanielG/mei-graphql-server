import { SchemaService } from '@services/schema.service';
import { injectable } from 'tsyringe';

@injectable()
export class SystemService {
    constructor(private readonly schemaSrv: SchemaService) {}

    public async start() {
        try {
            await this.schemaSrv.start();
        } catch (error) {
            console.error(error);
        }
    }
}
