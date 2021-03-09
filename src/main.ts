import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './modules/app.module';
import { configuration } from './configuration';
import { swagger } from './common/utils/swagger';

async function bootstrap() {
    const config = configuration();
    const {
        server: { port },
    } = config;

    const app = await NestFactory.create(AppModule);
    swagger(app);
    app.use(helmet());
    app.enableCors();

    await app.listen(port);
    console.log(
        `\nCrypto data collector is backed on: http://localhost:${port}/\nSwagger rest api: http://localhost:${port}/api`,
    );
}
bootstrap();
