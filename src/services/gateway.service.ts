import { GATEWAY as gatewayConfig } from '../config';
import * as httpClient from '../../utils/httpClient';
import { GatewayInterface, TokenInterface } from '../types/gateway.type';

class GatewayService implements GatewayInterface {
    /** public loadApplicationName(client_id: string) {
    const url = `${gatewayConfig.GATEWAY_ADMIN}/oauth2/${client_id}`;

    return httpClient
      .get(url, null)
      .then(response => {
        console.log(`the response from http client is`, response);

        return response.name;
      });
  }*/

    private authorize(
        clientID: string,
        responseType: string,
        scope: string,
        provisionKey: string,
        authenticatedUserID: string,
    ) {
        const url = `${gatewayConfig.GATEWAY_API}${gatewayConfig.API_PATH}/oauth2/authorize`;

        const body = {
            client_id: clientID,
            response_type: responseType,
            scope: scope,
            provision_key: provisionKey,
            authenticated_userid: authenticatedUserID,
        };

        return httpClient.post(url, body, null)
            .then(response => {
                return response.redirect_uri.split('code=')[1];
            })
            .catch(err => {
                throw err;
            });
    }

    public getAccessTokenFromRefreshToken(refreshToken: string, clientID: string, clientSecret: string) {
        const url = `${gatewayConfig.GATEWAY_API}${gatewayConfig.API_PATH}/oauth2/token`;

        const data = {
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken,
            'client_id': clientID, // obtained from above, linked to Consumer
            'client_secret': clientSecret, // obtained from above, linked to Consumer
        };

        return httpClient
            .post(url, data, null)
            .then(response => {
                return response;
            });
    }

    private getAuthorizationCode(code: string, client_id: string, client_secret: string) {
        const url = `${gatewayConfig.GATEWAY_API}${gatewayConfig.API_PATH}/oauth2/token`;

        const data = {
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': client_id, // obtained from above, linked to Consumer
            'client_secret': client_secret, // obtained from above, linked to Consumer
        };

        return httpClient
            .post(url, data, null)
            .then(response => {

                return response;
            });
    }

    public getAccessAndRefreshToken(client_id: string, client_secret: string, authenticatedUserID: string): Promise<TokenInterface> {
        try {
            const responseType = 'code';
            const scope = 'email';

            return this.authorize(client_id, responseType, scope, gatewayConfig.PROVISION_KEY, authenticatedUserID)
                .then(response => {
                    return response;
                })
                .then(primaryToken => {
                    return this.getAuthorizationCode(primaryToken, client_id, client_secret);
                });
        } catch (err) {
            throw err;
        }
    }

    public registerConsumer(user_name: string, custom_id: string) {
        const data = {
            username: user_name,
            custom_id,
        };

        const url = `${gatewayConfig.GATEWAY_ADMIN}/consumers`;

        return httpClient
            .post(url, data, null)
            .then(consumer => {
                return consumer;
            });
    }

    public createConsumerAuthCredentials(consumer_id: string, client_id?: string, client_secret?: string) {
        const data = {
            name: 'Application Name',
            client_secret: client_secret ? client_secret : consumer_id,
            client_id: client_id ? client_id : consumer_id,
            // put the redirect url to the specific client
            redirect_uris: ['http://PUT_YOUR_REDIRECT_URL.com'],
        };

        const url = `${gatewayConfig.GATEWAY_ADMIN}/consumers/${consumer_id}/oauth2`;

        return httpClient
            .post(url, data, null)
            .then(consumerCredentials => {

                return consumerCredentials;
            }).catch(err => {

                throw err;
            })

    }
}

const gatewayService = new GatewayService();

export {
    GatewayService,
};

export default gatewayService;
