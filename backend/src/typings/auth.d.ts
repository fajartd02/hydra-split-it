export type TokenType = 'ACCESS' | 'REFRESH';

export interface UserPayload {
    id: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}