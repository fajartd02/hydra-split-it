import authenticate from '../../middlewares/authenticate.middleware';

import { validate } from '../../utils/validate.util';
import { Request, Response } from 'express';
import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';
import {
    createWalletSchema,
    walletIdScehma
} from '../../validations/wallet.validation';
import { sendResponse } from '../../utils/api.util';
import { walletService } from '../../services/wallet.service';

@Controller({ path: 'wallets', middlewares: [authenticate()] })
export class WalletController {

    @ReqHandler('POST', '/:walletId')
    async create(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { walletId } = validate(req, walletIdScehma, 'params');
        const dto = validate(req, createWalletSchema, 'body');

        const wallet = await walletService.add(userId, walletId, dto);

        return sendResponse(res, {
            message: 'Successfully add wallet',
            data: {
                wallet
            }
        });
    }

}