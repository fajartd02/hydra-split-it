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
            id: 'maryjane123',
            fullName: 'Marry Jane',
            phone: '08123456788',
            password: await hashPassword('Marryjane123?')
        }),
        User.create({
            id: 'johndoe123',
            fullName: 'John Doe',
            phone: '08123456789',
            password: await hashPassword('JohnDoe123?')
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