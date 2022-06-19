import { StatusCodes } from 'http-status-codes';
import { Wallet } from '../database/entities/wallet.entity';
import { ResponseError } from '../utils/api.util';
import { UserWallet } from '../database/entities/user-wallet.entity';
import { MoreThanOrEqual, Not } from 'typeorm';

import type {
    CreateWalletDTO,
    UpdateWalletDTO
} from '../validations/wallet.validation';

const WalletNotFound = new ResponseError(
    'Cannot find wallet, maybe it\'s not supported',
    StatusCodes.NOT_FOUND
);

const UserHaveSameWallet = new ResponseError(
    'You already have the same wallet',
    StatusCodes.BAD_REQUEST
);

const UserDontHaveWallet = new ResponseError(
    'You don\'t have this wallet yet',
    StatusCodes.NOT_FOUND
);

class WalletService {

    async add(userId: string, walletId: number, dto: CreateWalletDTO) {
        const list = await UserWallet.find({
            where: { userId },
            order: { priority: 'ASC' }
        });

        let priority = 1;
        if (list.length) {
            const foundSameWallet = list.find((uw) => uw.walletId === walletId);
            if (foundSameWallet) {
                throw UserHaveSameWallet;
            }

            priority = list.length + 1;
        }

        const userWallet = await UserWallet.create({
            userId,
            walletId,
            priority,
            ...dto
        }).save();

        return userWallet;
    }

    async find(walletId: number) {
        const wallet = await Wallet.findOneBy({ id: walletId });
        if (!wallet) {
            throw WalletNotFound;
        }

        return wallet;
    }

    async update(userId: string, walletId: number, dto: UpdateWalletDTO) {
        const userWallet = await UserWallet.findOneBy({ userId, walletId });
        if (!userWallet) {
            throw UserDontHaveWallet;
        }

        userWallet.balance = dto.balance ?? userWallet.balance;
        if (dto.priority) {
            userWallet.priority = dto.priority;

            const list = await UserWallet.findBy({
                userId: Not(userId),
                walletId: Not(walletId),
                priority: MoreThanOrEqual(dto.priority)
            });

            const haveSamePriority = list.find((uw) =>
                uw.priority === dto.priority);

            // if there's the same priority,
            // we'll be increasing the priority of all of the fetched data
            // thus creating the effect of sorting them.
            if (haveSamePriority) {
                for (const tmp of list) {
                    tmp.priority++;
                }

                await UserWallet.save(list);
            }
        }

        await userWallet.save();
    }

}

export const walletService = new WalletService();