import axios from 'axios';
import { token } from './config';

export const request = (options) => {
    return axios(Object.assign({}, options, {
        params: {
            api_token: token,
            limit: 1000000,
        },
        timeout: 15 * 1000,
    }));
}
