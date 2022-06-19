import { StatusCodes } from 'http-status-codes';
import { Team } from '../database/entities/team.entity';
import { TeamUser } from '../database/entities/teams-users.entity';
import { ResponseError } from '../utils/api.util';
import { userService } from './user.service';
import { UserWallet } from '../database/entities/user-wallet.entity';
import { TeamStatus } from '../validations/team.validation';

import type { TeamUpdateDTO } from '../validations/team.validation';
import type { PaymentDTO } from '../validations/wallet.validation';

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

const WalletAddressNotFound = new ResponseError(
    'Cannot find this wallet address',
    StatusCodes.NOT_FOUND
);

const NotEnoughMoney = new ResponseError(
    "Team doesn't have enough money to pay the bill!",
    StatusCodes.FORBIDDEN
);

class TeamService {

    async create(userId: string) {
        const user = await userService.get(userId);
        const team = await Team.create().save();

        await TeamUser.create({ user, team }).save();

        return team;
    }

    async get(userId: string, teamId: number) {
        const teamUsers = await TeamUser.find({
            where: { teamId, userId },
            relations: { user: true }
        });

        if (!teamUsers) {
            throw TeamNotFound;
        }

        const foundUser = teamUsers.map((tu) => tu.user);
        const team = await Team.findOneBy({ id: teamId });

        if (!team || !foundUser) {
            throw TeamNotFound;
        }

        return team;
    }

    private async getTeamUser(userId: string, teamId: number) {
        const teamUser = await TeamUser.findOneBy({ teamId, userId });
        if (!teamUser) {
            throw UserNotJoinTeam;
        }

        return teamUser;
    }

    async invite(userId: string, teamId: number) {
        let isJoinTeam = true;
        try {
            await this.getTeamUser(userId, teamId);
        } catch (e) {
            isJoinTeam = false;
        }

        if (isJoinTeam) {
            throw UserAlreadyJoin;
        }

        await TeamUser.create({ userId, teamId }).save();
        return Team.findOneBy({ id: teamId });
    }

    async update(userId: string, teamId: number, dto: TeamUpdateDTO) {
        const teamUser = await this.getTeamUser(userId, teamId);

        Object.assign(teamUser, dto);
        await teamUser.save();

        return this.get(userId, teamId);
    }

    async sendPayment(userId: string, teamId: number, dto: PaymentDTO) {
        const targetWallet = await UserWallet.findOneBy({
            address: dto.walletAddress
        });

        if (!targetWallet) {
            throw WalletAddressNotFound;
        }

        const members = await TeamUser.findBy({ teamId });
        const totalMoney = members
            .map((member) => member.collabMoney)
            .reduce((prev, curr) => prev + curr, 0);

        if (totalMoney < dto.bill) {
            throw NotEnoughMoney;
        }

        const payments: Promise<void>[] = [];
        for (const member of members) {
            const res = userService.sendPayment(member.userId, dto);
            payments.push(res);
        }

        await Promise.all(payments);

        const team = await this.get(userId, teamId);
        team.status = TeamStatus.COMPLETE;

        await team.save();
    }

}

export const teamService = new TeamService();