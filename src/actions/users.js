import * as C from '../constants/users';

export function getUserList(payload) {
    return {
      type: C.USER_LIST_LOADING,
      payload
    };
}