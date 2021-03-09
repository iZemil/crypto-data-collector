import { Controller, Get, Query } from '@nestjs/common';

import { Price } from './price.entity';
import { PriceService } from './price.service';

@Controller('prices')
export class PriceController {
    constructor(private priceService: PriceService) {}

    @Get()
    private async getPrices(@Query('fsyms') fsyms: string, @Query('tsyms') tsyms: string): Promise<Price[]> {
        return this.priceService.getPrices(fsyms, tsyms);
    }
}
