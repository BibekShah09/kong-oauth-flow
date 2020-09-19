import axios from 'axios';
// const fs = require('fs');
const https = require('https');

const errorFormatter = (error) => {
    return error.message;
};

const get = async (url, token) =>
    axios({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Host: 'mockbin.org',
        },
        responseType: 'json',
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            throw errorFormatter(error)
        });

const post = async (url, body, token) => axios
    .post(url, body, {
        headers: {
            // Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Host: 'mockbin.org',
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        },
    })
    .then((response) => response.data)
    .catch((error) => {
        throw (errorFormatter(error));
    });

export {
    get,
    post,
};
