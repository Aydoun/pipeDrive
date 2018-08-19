import * as C from '../constants/users';

export function getUserList(payload) {
    return {
      type: C.USER_LIST_LOADING,
      payload
    };
}

export function OrderList(userList) {
  return {
    type: C.SAVE_USER_LIST,
    userList: userList.sort((a, b) => a.order - b.order),
  };
}

export function selectUser(userList, userId) {
  return {
    type: C.SELECT_USER,
    selectedUser: userList.find(el => el.id === userId),
    userDetailModal: true,
  };
}
