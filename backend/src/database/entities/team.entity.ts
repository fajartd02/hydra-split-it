import { TrackingEmbed } from './embedded/tracking.embed';
import { TeamUser } from './teams-users.entity';

import {
    Entity, BaseEntity,
    Column, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { TeamStatus } from '../../validations/team.validation';

@Entity('teams')
export class Team extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => TeamUser, (tu) => tu.team, { eager: true })
    teamUsers!: TeamUser[];

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

    @Column({ type: 'smallint', default: TeamStatus.ONGOING })
    status!: number;

    get users() {
        return this.teamUsers.map((tu) => tu.user);
    }

}