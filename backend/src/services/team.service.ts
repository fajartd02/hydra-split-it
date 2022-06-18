import { StatusCodes } from 'http-status-codes';
import { Team } from '../database/entities/team.entity';
import { TeamUser } from '../database/entities/teams-users.entity';
import { ResponseError } from '../utils/api.util';
import { userService } from './user.service';

const TeamNotFound = new ResponseError(
    'Cannot find team',
    StatusCodes.NOT_FOUND
);

const UserAlreadyJoin = new ResponseError(
    'User already joined the team',
    StatusCodes.BAD_REQUEST
);

const UserNotJoinTeam = new ResponseError(
    'User haven\'t joined the team',
    StatusCodes.BAD_REQUEST
);

class TeamService {

    async create(userId: string) {
        const user = await userService.get(userId);
        const team = await Team.create().save();
        const teamUser = await TeamUser.create({ user, team }).save();

        return { team, teamUser };
    }

    async get(teamId: number) {
        const team = await Team.findOneBy({ id: teamId });
        if (!team) {
            throw TeamNotFound;
        }

        return team;
    }

    async getTeamUser(teamId: number, userId: string) {
        const teamUser = await TeamUser.findOneBy({ teamId, userId });
        if (!teamUser) {
            throw UserNotJoinTeam;
        }

        return teamUser;
    }

    async invite(userId: string, teamId: number) {
        const user = await userService.get(userId);
        const team = await this.get(teamId);

        let isJoinTeam = true;
        try {
            await this.getTeamUser(teamId, userId);
        } catch (e) {
            isJoinTeam = false;
        }

        if (isJoinTeam) {
            throw UserAlreadyJoin;
        }

        return TeamUser.create({ user, team }).save();
    }

    async setCollabMoney(userId: string, teamId: number, collabMoney: number) {
        const teamUser = await this.getTeamUser(teamId, userId);

        teamUser.collabMoney = collabMoney;
        await teamUser.save();
    }

}

export const teamService = new TeamService();