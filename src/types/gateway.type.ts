export interface TokenInterface {
    refresh_token: string,
    token_type: string,
    access_token: string,
    expires_in: number
}

export interface GatewayInterface {
    getAccessTokenFromRefreshToken(refreshToken: string, clientID: string, clientSecret: string) : Promise <void>;
    getAccessAndRefreshToken(client_id: string, client_secret: string, authenticatedUserID: string): Promise<TokenInterface>;
}
