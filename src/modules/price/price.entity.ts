import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TCurrencySymbols } from './constants';
import { Rate } from './rate.entity';

@Entity()
export class Price {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('timestamptz')
    public date: Date;

    @Column('text')
    public name: TCurrencySymbols;

    @OneToMany(
        () => Rate,
        rate => rate.price,
        {
            cascade: true,
        },
    )
    public rates: Rate[];
}
