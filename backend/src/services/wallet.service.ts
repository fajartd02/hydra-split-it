import { StatusCodes } from 'http-status-codes';
import { Wallet } from '../database/entities/wallet.entity';
import { ResponseError } from '../utils/api.util';
import { UserWallet } from '../database/entities/user-wallet.entity';
import { LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';

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
        let list: UserWallet[];

        if (dto.priority) {
            const currPriority = userWallet.priority;
            userWallet.priority = 0;
            const targetPriority = dto.priority;
            if (targetPriority < currPriority) {
                list = await UserWallet.findBy({
                    userId,
                    priority: MoreThanOrEqual(targetPriority)
                });

                let pivot = 0;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].priority === currPriority) {
                        pivot = i;
                        break;
                    }
                }

                for (let i = pivot - 1; i >= 0; i--) {
                    list[i].priority++;
                }
                list[pivot].priority = targetPriority;
            } else {
                list = await UserWallet.findBy({
                    userId,
                    priority: LessThanOrEqual(targetPriority)
                });

                console.log(list);

                let pivot = 0;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].priority === currPriority) {
                        pivot = i;
                        break;
                    }
                }

                for (let i = currPriority + 1;
                    i <= targetPriority; i++) {
                    list[i].priority--;
                }
            }


            await userWallet.save();
            await UserWallet.save(list);
            userWallet.priority = targetPriority;
        }

        await userWallet.save();
    }

}

export const walletService = new WalletService();