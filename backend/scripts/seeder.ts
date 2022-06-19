// * max-len isn't needed here
// * This script is very dependant on the project files

/* eslint-disable max-len */

import bcrypt from 'bcrypt';
import logger from '../src/utils/logger.util';
import config from '../src/configs/config';

import { appDataSource } from '../src/database/datasource';
import { User } from '../src/database/entities/user.entity';
import { Team } from '../src/database/entities/team.entity';

import { TeamUser } from '../src/database/entities/teams-users.entity';

// -------------------------------------------------------------------- //

function hashPassword(password: string) {
    return bcrypt.hash(password, config.hashRounds);
}

async function insertData() {
    const users: User[] = [
        User.create({
            id: 'fajar123',
            fullName: 'Fajar Hamka',
            phone: '08123456786',
            password: await hashPassword('Fajar123?')
        }),
        User.create({
            id: 'rahmat123',
            fullName: 'Rahmat Syifana',
            phone: '08123456787',
            password: await hashPassword('Rahmat123?')
        }),
        User.create({
            id: 'alvian123',
            fullName: 'Alvian Daru',
            phone: '08123456788',
            password: await hashPassword('Alvian123?')
        }),
        User.create({
            id: 'fabian123',
            fullName: 'Fabian Habil',
            phone: '08123456789',
            password: await hashPassword('Fabian123?')
        })
    ];

    await User.save(users);
    const team = await Team.create().save();

    const teamUsers: TeamUser[] = [];
    for (const user of users) {
        teamUsers.push(TeamUser.create({ team, user }));
    }
    await TeamUser.save(teamUsers);

    return { users, team, teamUsers };
}

// -------------------------------------------------------------------- //

appDataSource.initialize()
    .then(async () => {
        await insertData();

        logger.debug('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => logger.error(`${err} ${err.stack}`));