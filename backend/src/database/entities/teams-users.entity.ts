import { User } from './user.entity';
import { Team } from './team.entity';
import { TrackingEmbed } from './embedded/tracking.embed';

import {
    Entity, BaseEntity,
    Column, PrimaryColumn, ManyToOne, JoinColumn
} from 'typeorm';

@Entity('teams_users')
export class TeamUser extends BaseEntity {

    @PrimaryColumn({ name: 'team_id' })
    teamId!: number;

    @PrimaryColumn({ name: 'user_id' })
    userId!: number;

    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team_id' })
    team!: Team;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ name: 'collab_money' })
    collabMoney!: number;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

}