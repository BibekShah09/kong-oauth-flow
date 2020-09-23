import { Request, Response, Application } from 'express';
import express = require('express');

import { PORT } from './src/config';
import gatewayService from './src/services/gateway.service';

const app: Application = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.json());

app.post('/access-refresh-token', async function (req: Request, res: Response) {
    try {
        const clientID: string = req.body.client_id;
        const clientSecret: string = req.body.client_secret;
        const authenticatedUserID: string = req.body.authenticated_user_id;

        const token = await gatewayService.getAccessAndRefreshToken(
            clientID,
            clientSecret,
            authenticatedUserID
        );

        res.send({data: token});
    } catch (err) {
        res.send(err);
    }
});

app.post('/access-token', async function (req: Request, res: Response) {
    try {
        const refreshToken: string = req.body.refresh_token;
        const clientID: string = req.body.client_id;
        const clientSecret: string = req.body.client_secret;

        const token = await gatewayService.getAccessTokenFromRefreshToken(
            refreshToken,
            clientID,
            clientSecret
        );

        res.send({data: token});
    } catch (err) {
        res.send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
