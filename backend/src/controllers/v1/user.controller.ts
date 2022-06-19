import authenticate from '../../middlewares/authenticate.middleware';

import { Request, Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { userService } from '../../services/user.service';
import { validate } from '../../utils/validate.util';
import { paySchema } from '../../validations/wallet.validation';

import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';

@Controller({ path: 'users', middlewares: [authenticate()] })
export class UserController {

    @ReqHandler('GET', '/')
    async getAll(_: Request, res: Response) {
        const users = await userService.getAll();
        return sendResponse(res, {
            message: 'OK',
            data: {
                users
            }
        });
    }

    @ReqHandler('GET', '/profile')
    async profile(req: Request, res: Response) {
        const { id } = req.userPayload!;
        const user = await userService.get(id);

        return sendResponse(res, {
            message: 'Successfully found user data',
            data: { user }
        });
    }

    @ReqHandler('POST', '/pay')
    async sendPayment(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const dto = validate(req, paySchema, 'body');

        await userService.sendPayment(userId, dto);

        return sendResponse(res, {
            message: 'Successfully paid the bill!'
        });
    }

}