import authenticate from '../../middlewares/authenticate.middleware';

import { Request, Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { teamService } from '../../services/team.service';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../utils/validate.util';
import { teamIdDto, updateTeamDto } from '../../validations/team.validation';

import {
    Controller,
    ReqHandler
} from '../../internals/decorators/express.decorator';

@Controller({ path: 'teams', middlewares: [authenticate()] })
export class TeamController {

    @ReqHandler('POST', '/')
    async create(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const team = await teamService.create(userId);

        return sendResponse(res, {
            message: 'Successfully created a new team',
            statusCode: StatusCodes.CREATED,
            data: { team }
        });
    }

    @ReqHandler('GET', '/:teamId')
    async get(req: Request, res: Response) {
        const { teamId } = validate(req, teamIdDto, 'params');
        const { id: userId } = req.userPayload!;

        const team = await teamService.get(userId, teamId);

        return sendResponse(res, {
            message: 'Successfully get team',
            data: { team }
        });
    }

    @ReqHandler('POST', '/invite/:teamId')
    async invite(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { teamId } = validate(req, teamIdDto, 'params');

        const team = await teamService.invite(userId, teamId);
        return sendResponse(res, {
            message: 'Successfully invited user to team',
            data: { team }
        });
    }

    @ReqHandler('PUT', '/:teamId')
    async update(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const { teamId } = validate(req, teamIdDto, 'params');
        const dto = validate(req, updateTeamDto, 'body');

        const team = await teamService.update(userId, teamId, dto);
        return sendResponse(res, {
            message: 'Successfully updated team user',
            data: { team }
        });
    }

}