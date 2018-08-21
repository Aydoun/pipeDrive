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
    case C.TOGGLE_LIST_LOADING:
      return Object.assign({}, state, {
        listLoading: action.loading,
      });
    case C.TOGGLE_ADD_USER:
      return Object.assign({}, state, {
        addUserLoading: action.loading,
      });
    case C.TOGGLE_DELETE_USER:
      return Object.assign({}, state, {
        deleteUserLoading: action.loading,
      });
    case C.SELECT_USER:
      return Object.assign({}, state, {
        selectedUser: action.selectedUser,
        userDetailModal: action.userDetailModal,
      });
    case C.SAVE_USER_LIST:
      return Object.assign({}, state, {
        userList: action.userList,
      });
    case C.TOGGLE_USER_DETAILS:
      return Object.assign({}, state, {
        userDetailModal: action.userDetailModal,
      });
    case C.TOGGLE_ADD_MODAL:
      return Object.assign({}, state, {
        userAddModal: action.userAddModal,
      });
    default:
      return state;
  }
}

export default userReducer;
