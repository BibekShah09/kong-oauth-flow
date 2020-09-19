const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv) {
    // This error should crash whole process
    throw new Error('⚠️  Couldn\'t find .env file  ⚠️');
}

const GATEWAY = {
    PROVISION_KEY: "lWi8AhpJYCDz3sSWFs665eJLADu6Yhew",
    GATEWAY_ADMIN: 'http://127.0.0.1:8001',
    GATEWAY_API: 'https://127.0.0.1:8443',
    // GATEWAY_API: 'http://127.0.0.1:8000',
    API_PATH: '/web', // redirection to the Service where plugin is enabled.
    SERVICE_HOST: 'mockbin.org',
};

export {
    GATEWAY
};
