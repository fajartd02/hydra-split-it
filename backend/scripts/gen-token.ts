/* eslint-disable no-await-in-loop */

import { User } from '../src/database/entities/user.entity';
import { authService } from '../src/services/auth.service';
import { appDataSource } from '../src/database/datasource';
import { exit } from 'process';

async function run() {
    await appDataSource.initialize();

    const users = await User.find();
    for (const user of users) {
        const token = await authService.generateToken(user, 'ACCESS');

        console.log(`${user.id} = ${token}\n`);
    }

    exit();
}

run();