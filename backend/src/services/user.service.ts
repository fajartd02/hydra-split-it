import { StatusCodes } from 'http-status-codes';
import { UserWallet } from '../database/entities/user-wallet.entity';
import { User } from '../database/entities/user.entity';
import { Errors, ResponseError } from '../utils/api.util';

import type { SoloPayDTO } from '../validations/wallet.validation';

const NotEnoughMoney = new ResponseError(
    "You don't have enough money to pay the bill!",
    StatusCodes.FORBIDDEN
);

const WalletAddressNotFound = new ResponseError(
    'Cannot find this wallet address',
    StatusCodes.NOT_FOUND
);

class UserService {

    async get(id: string) {
        const user = await User.findOneBy({ id });
        if (!user) {
            throw Errors.NO_SESSION;
        }

        return user;
    }

    async sendPayment(userId: string, { walletAddress, bill }: SoloPayDTO) {
        const wallets = await UserWallet.find({
            where: { userId },
            order: { priority: 'ASC' }
        });
        const targetWallet = await UserWallet.findOneBy({
            address: walletAddress
        });

        if (!targetWallet) {
            throw WalletAddressNotFound;
        }

        const originalBill = bill;
        for (const wallet of wallets) {
            if (bill <= 0) {
                break;
            }

            let taken = wallet.balance;
            if (wallet.balance >= bill) {
                taken = wallet.balance - bill;
            }

            bill -= taken;
            wallet.balance = taken;
        }

        if (bill > 0) {
            throw NotEnoughMoney;
        }

        targetWallet.balance += originalBill;

        await targetWallet.save();
        await UserWallet.save(wallets);
    }

}

export const userService = new UserService();