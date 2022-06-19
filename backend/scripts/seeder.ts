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
import { Wallet } from '../src/database/entities/wallet.entity';
import { UserWallet } from '../src/database/entities/user-wallet.entity';

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
        })
    ];
    const wallets: Wallet[] = [
        Wallet.create({ name: 'GoPay' }),
        Wallet.create({ name: 'OVO' }),
        Wallet.create({ name: 'KlikBCA Internet Banking' }),
    ];
    const team = await Team.create().save();

    await Wallet.save(wallets);
    await User.save(users);

    const teamUsers: TeamUser[] = [];
    for (const user of users) {
        teamUsers.push(TeamUser.create({ team, user }));
    }
    await TeamUser.save(teamUsers);

    const usersWallets: UserWallet[] = [
        UserWallet.create({
            user: users[0],
            wallet: wallets[0],
            priority: 1,
            balance: 5_000
        }),
        UserWallet.create({
            user: users[0],
            wallet: wallets[1],
            priority: 2,
            balance: 1_000_000
        }),

        UserWallet.create({
            user: users[1],
            wallet: wallets[2],
            priority: 1,
            balance: 200_000
        }),

        UserWallet.create({
            user: users[2],
            wallet: wallets[0],
            priority: 1,
            balance: 100_000
        }),
        UserWallet.create({
            user: users[2],
            wallet: wallets[1],
            priority: 2,
            balance: 30_000
        })
    ];

    await UserWallet.save(usersWallets);
}

// -------------------------------------------------------------------- //

appDataSource.initialize()
    .then(async () => {
        await insertData();

        logger.debug('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => logger.error(`${err} ${err.stack}`));