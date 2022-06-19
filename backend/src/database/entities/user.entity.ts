import { UserWallet } from './user-wallet.entity';
import { TrackingEmbed } from './embedded/tracking.embed';
import { TeamUser } from './teams-users.entity';

import {
    Entity, BaseEntity,
    Column,
    PrimaryColumn,
    OneToMany,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryColumn({ length: 64 })
    id!: string;

    @Column({ name: 'full_name', length: 64 })
    fullName!: string;

    @Column({ length: 64 })
    password!: string;

    @Column({ length: 32 })
    phone!: string;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

    @OneToMany(() => UserWallet, (uw) => uw.user)
    usersWallets!: UserWallet[];

    @OneToMany(() => TeamUser, (tu) => tu.user)
    teamsUsers!: TeamUser[];

    toJSON() {
        const cloned = { ...this } as Record<string, unknown>;
        delete cloned.password;

        return cloned;
    }

}