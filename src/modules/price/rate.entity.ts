import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TCurrencySymbols } from './constants';
import { Price } from './price.entity';

@Entity()
export class Rate {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('text')
    public name: TCurrencySymbols;

    @ManyToOne(
        () => Price,
        price => price.rates,
    )
    public price: Price;

    @Column('decimal')
    public PRICE: number;

    @Column('decimal')
    public VOLUMEDAY: number;

    @Column('decimal')
    public CHANGE24HOUR: number;

    @Column('decimal')
    public MEDIAN: number;

    @Column('text')
    public LASTMARKET: string;
}
