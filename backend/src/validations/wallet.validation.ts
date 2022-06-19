import joi from 'joi';

export interface CreateWalletDTO {
    balance: number;
}

export interface UpdateWalletDTO {
    balance?: number;
    priority?: number;
}

export const createWalletSchema = joi.object<CreateWalletDTO>({
    balance: joi.number()
        .min(1_000)
        .required()
});

export const updateWalletSchema = joi.object<UpdateWalletDTO>({
    balance: joi.number()
        .min(1_000)
        .optional(),
    priority: joi.number()
        .min(1)
        .optional()
});