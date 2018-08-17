import * as C from '../constants/users';

export function getUserList(payload) {
    return {
      type: C.USER_LIST_LOADING,
      payload
    };
}

export function selectUser(userList, userId) {
  return {
    type: C.SELECT_USER,
    selectedUser: userList.find(el => el.id === userId),
  };
}
