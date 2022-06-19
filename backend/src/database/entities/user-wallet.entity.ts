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
@Unique(['user_id', 'wallet_id', 'address', 'priority'])
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

    @Column({ default: 0 })
    balance!: number;

    @Column()
    priority!: number;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

}