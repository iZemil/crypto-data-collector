import { TCurrencySymbols } from './constants';
import { Price } from './price.entity';
import { Rate } from './rate.entity';

class PriceMapper {
    public fromCryptoApiToEntities(cryptoApiData) {
        const prices = Object.entries(cryptoApiData.RAW).map(([priceName, priceData]) => {
            const price = new Price();

            price.name = priceName as TCurrencySymbols;
            price.date = new Date();
            price.rates = Object.entries(priceData).map(([rateName, rateData]) => {
                const rate = new Rate();
                rate.name = rateName as TCurrencySymbols;
                rate.PRICE = rateData.PRICE;
                rate.VOLUMEDAY = rateData.VOLUMEDAY;
                rate.CHANGE24HOUR = rateData.CHANGE24HOUR;
                rate.MEDIAN = rateData.MEDIAN;
                rate.LASTMARKET = rateData.LASTMARKET;
                return rate;
            });

            return price;
        });

        return prices;
    }
}

export const priceMapper = new PriceMapper();
