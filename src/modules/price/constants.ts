import { CronExpression } from '@nestjs/schedule';

export const FETCH_PRICES_INTERVAL = CronExpression.EVERY_MINUTE;

export const CURRENCY_SYMBOLS = {
    USD: 'USD',
    EUR: 'EUR',
    BTC: 'BTC',
    ETH: 'ETH',
    // ...
} as const;
type TCurrencyKeys = keyof typeof CURRENCY_SYMBOLS;
export type TCurrencySymbols = typeof CURRENCY_SYMBOLS[TCurrencyKeys];

/**
 * All api docs: https://min-api.cryptocompare.com/documentation
 */
export const getPricesUrl = (fsyms: string, tsyms: string) =>
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`;
