import joi from 'joi';

export interface TeamId {
    teamId: number;
}

export const teamIdDto = joi.object<TeamId>({
    teamId: joi.number()
        .min(1)
        .required()
});