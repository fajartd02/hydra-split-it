import { TrackingEmbed } from './embedded/tracking.embed';

import {
    Entity, BaseEntity,
    Column, PrimaryGeneratedColumn,
    OneToMany,
    PrimaryColumn,
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

    toJSON() {
        const cloned = { ...this } as Record<string, unknown>;
        delete cloned.password;

        return cloned;
    }

}