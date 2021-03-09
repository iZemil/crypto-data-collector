import { HttpService, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { FETCH_PRICES_INTERVAL, getPricesUrl } from './constants';
import { Price } from './price.entity';
import { priceMapper } from './price.mapper';
import { Rate } from './rate.entity';

@Injectable()
export class PriceService {
    private readonly logger = new Logger(PriceService.name);

    constructor(
        @InjectRepository(Price)
        private priceRepo: Repository<Price>,
        @InjectRepository(Rate)
        private rateRepo: Repository<Rate>,
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}

    private async makeRequest(
        url: string,
    ): Promise<{
        data: any;
        status: HttpStatus;
    }> {
        const { status, data } = await this.httpService.get(url).toPromise();
        return { status, data };
    }

    private getCryptoApiPrices(fsyms, tsyms) {
        return this.makeRequest(getPricesUrl(fsyms, tsyms));
    }

    @Cron(FETCH_PRICES_INTERVAL)
    public async cronFetchPrices(): Promise<void> {
        try {
            const { fsyms, tsyms } = this.configService.get('priceModule');
            const cryptoApiRes = await this.getCryptoApiPrices(fsyms, tsyms);

            if (cryptoApiRes.status === HttpStatus.OK) {
                await Promise.all([this.rateRepo.delete({}), this.priceRepo.delete({})]);
                const prices = priceMapper.fromCryptoApiToEntities(cryptoApiRes.data);

                await this.priceRepo.save(prices);
            }
        } catch (error) {
            this.logger.debug('Fetch prices cron is failed');
            this.logger.error(error);
        }
    }

    public async getPrices(fsyms: string, tsyms: string): Promise<Price[]> {
        const cryptoApiRes = await this.getCryptoApiPrices(fsyms, tsyms);

        if (cryptoApiRes.status === HttpStatus.OK) {
            return priceMapper.fromCryptoApiToEntities(cryptoApiRes.data);
        } else {
            return this.priceRepo.find({
                join: { alias: 'price', leftJoinAndSelect: { rates: 'price.rates' } },
                where: qb => {
                    qb.where({
                        name: In(fsyms.split(',')),
                    }).andWhere('rates.name IN (:...names)', { names: tsyms.split(',') });
                },
            });
        }
    }
}
