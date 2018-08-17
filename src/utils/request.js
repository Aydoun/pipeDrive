import axios from 'axios';
import { token } from './config';

export default function request(options) {
    return axios(Object.assign({}, options, {
        params: {
            api_token: token,
        },
        timeout: 15 * 1000,
    }));
 }
