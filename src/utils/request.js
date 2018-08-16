import axios from 'axios';

export default function request(options) {
    return axios(options);
//    return axios(assign(options, {
//      headers: { 'x-access-token': localStorage.getItem('token') },
//      timeout: 15 * 1000,
//    }))
 }
