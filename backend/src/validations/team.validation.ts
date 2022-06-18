import joi from 'joi';

interface TeamId {
    teamId: number;
}

export interface TeamUpdateDTO {
    collabMoney: number;
}

export const teamIdDto = joi.object<TeamId>({
    teamId: joi.number()
        .min(1)
        .required()
});

export const updateTeamDto = joi.object<TeamUpdateDTO>({
    collabMoney: joi.number()
        .min(1)
        .required()
});
