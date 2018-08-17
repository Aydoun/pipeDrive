import * as C from '../constants/users';

const initialState = {
    userList: [],
    selectedUser: {},
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
    case C.SAVE_USER_LIST:
      return Object.assign({}, state, {
        userList: action.userList,
        listLoading: false,
      });
    default:
      return state;
  }
}

export default userReducer;
