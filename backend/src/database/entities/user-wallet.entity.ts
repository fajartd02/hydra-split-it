import { User } from './user.entity';
import { TrackingEmbed } from './embedded/tracking.embed';
import { Wallet } from './wallet.entity';

import {
    Entity, BaseEntity,
    Column, PrimaryColumn, JoinColumn,
    ManyToOne,
    Unique,
} from 'typeorm';

@Entity('users_wallets')
@Unique('UNIQUE_USER', ['userId', 'priority'])
@Unique('UNIQUE_ADDRESS', ['address'])
export class UserWallet extends BaseEntity {

    @PrimaryColumn({ name: 'user_id' })
    userId!: string;

    @PrimaryColumn({ name: 'wallet_id' })
    walletId!: number;

    @ManyToOne(() => User, (user) => user.usersWallets)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Wallet, (wallet) => wallet.usersWallets)
    @JoinColumn({ name: 'wallet_id' })
    wallet!: Wallet;

    @Column({ length: 64 })
    address!: string;

    @Column()
    balance!: number;

    @Column()
    priority!: number;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

}