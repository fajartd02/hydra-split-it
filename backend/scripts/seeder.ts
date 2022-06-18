// * max-len isn't needed here
// * This script is very dependant on the project files

/* eslint-disable max-len */

import bcrypt from 'bcrypt';
import logger from '../src/utils/logger.util';

import { appDataSource } from '../src/database/datasource';
// import { authService } from '../src/services/auth.service';
import { User } from '../src/database/entities/user.entity';
import { DateTime } from 'luxon';
import config from '../src/configs/config';

// -------------------------------------------------------------------- //

const DEFAULT_PHONE = '628174991828';

function randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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

    return { users };
}

// -------------------------------------------------------------------- //

appDataSource.initialize()
    .then(async () => {
        await insertData();

        logger.debug('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => logger.error(`${err} ${err.stack}`));