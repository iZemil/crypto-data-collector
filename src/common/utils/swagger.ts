import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication) {
    const docConfig = new DocumentBuilder()
        .setTitle('Auth module API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup('api', app, document);
}
