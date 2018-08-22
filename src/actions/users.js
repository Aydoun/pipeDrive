import * as C from '../constants/users';
import { userOrder } from '../utils/config';

export function getUserList() {
    return {
      type: C.USER_LIST_LOADING,
      loading: true,
    };
}

export function OrderList(userList) {
  return {
    type: C.SAVE_USER_LIST,
    userList: userList.sort((a, b) => a[userOrder] - b[userOrder]),
  };
}

export function selectUser(userList, userId) {
  return {
    type: C.SELECT_USER,
    selectedUser: userList.find(el => el.id === userId),
    userDetailModal: true,
  };
}

export function addUser(payload) {
  return {
    type: C.ADD_USER,
    payload,
  };
}

export function deleteUser(id) {
  return {
    type: C.DELETE_USER,
    id,
  };
}
