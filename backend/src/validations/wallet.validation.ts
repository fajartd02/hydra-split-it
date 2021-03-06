import joi from 'joi';

export interface CreateWalletDTO {
    address: string;
    balance: number;
}

export interface UpdateWalletDTO {
    balance?: number;
    priority?: number;
}

export interface WalletId {
    walletId: number;
}

export const walletIdScehma = joi.object<WalletId>({
    walletId: joi.number()
        .min(1)
        .required()
});

export interface PaymentDTO {
    walletAddress: string;
    bill: number;
}

export const createWalletSchema = joi.object<CreateWalletDTO>({
    address: joi.string()
        .min(1)
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

export const paySchema = joi.object<PaymentDTO>({
    walletAddress: joi.string()
        .min(1)
        .required(),
    bill: joi.number()
        .min(1_000)
        .required()
});