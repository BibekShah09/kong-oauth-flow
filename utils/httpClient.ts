import axios from 'axios';
// const fs = require('fs');
const https = require('https');

const errorFormatter = (error) => {
    console.log(`error is`, error);

    return error.message;
};

const get = async (url) =>
    axios({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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

const post = async (url, body) => axios
    .post(url, body, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
