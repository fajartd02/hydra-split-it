import { TrackingEmbed } from './embedded/tracking.embed';
import { TeamUser } from './teams-users.entity';

import {
    Entity, BaseEntity,
    Column, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

@Entity('teams')
export class Team extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => TeamUser, (tu) => tu.team)
    teamUsers!: TeamUser[];

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

    get users() {
        return this.teamUsers.map((tu) => tu.user);
    }

}