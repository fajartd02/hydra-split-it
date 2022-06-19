import joi from 'joi';

export interface CreateWalletDTO {
    address: string;
    balance: number;
}

export interface UpdateWalletDTO {
    balance?: number;
    priority?: number;
}

export const createWalletSchema = joi.object<CreateWalletDTO>({
    address: joi.string()
        .min(5)
        .max(64)
        .required(),
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