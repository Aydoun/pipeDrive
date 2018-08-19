import * as C from '../constants/users';

const initialState = {
    userList: [],
    selectedUser: {},
    userDetailModal: false,
    userAddModal: false,
    listLoading: false,
    addUserLoading: false,
    deleteUserLoading: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case C.USER_LIST_LOADING:
      return Object.assign({}, state, {
        listLoading: true,
      });
    case C.SELECT_USER:
      return Object.assign({}, state, {
        selectedUser: action.selectedUser,
        userDetailModal: action.userDetailModal,
      });
    case C.SAVE_USER_LIST:
      return Object.assign({}, state, {
        userList: action.userList,
        listLoading: false,
      });
    case C.TOGGLE_USER_DETAILS:
      return Object.assign({}, state, {
        userDetailModal: action.userDetailModal,
      });
    case C.TOGGLE_USER_ADD:
      return Object.assign({}, state, {
        userAddModal: action.userAddModal,
      });
    default:
      return state;
  }
}

export default userReducer;
