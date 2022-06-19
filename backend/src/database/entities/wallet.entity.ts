import { TrackingEmbed } from './embedded/tracking.embed';
import { UserWallet } from './user-wallet.entity';

import {
    Entity, BaseEntity,
    Column, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';

@Entity('wallets')
export class Wallet extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => UserWallet, (uw) => uw.wallet)
    usersWallets!: UserWallet[];

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

}