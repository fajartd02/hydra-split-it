import { StatusCodes } from 'http-status-codes';
import { UserWallet } from '../database/entities/user-wallet.entity';
import { User } from '../database/entities/user.entity';
import { Errors, ResponseError } from '../utils/api.util';

import type { PaymentDTO } from '../validations/wallet.validation';

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

    async sendPayment(userId: string, { walletAddress, bill }: PaymentDTO) {
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
        for (const curr of wallets) {
            if (bill <= 0) {
                break;
            }

            let taken;
            if (curr.balance < bill) {
                taken = curr.balance;
                curr.balance = 0;
            } else {
                taken = curr.balance - bill;
                curr.balance = taken;
            }

            bill -= taken;
        }

        if (bill > 0) {
            throw NotEnoughMoney;
        }

        targetWallet.balance += originalBill;

        await UserWallet.save(wallets);
        await targetWallet.save();
    }

}

export const userService = new UserService();