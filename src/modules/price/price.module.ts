import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration } from '../../configuration';

import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { Price } from './price.entity';
import { Rate } from './rate.entity';

@Module({
    controllers: [PriceController],
    providers: [PriceService],
    imports: [
        TypeOrmModule.forFeature([Price, Rate]),
        ConfigModule.forRoot({
            load: [configuration],
        }),
        HttpModule,
    ],
})
export class PriceModule {}
