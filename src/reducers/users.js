import * as C from '../constants/users';

const initialState = {
    userList: [],
    listLoading: false,
    addUserLoading: false,
    deleteUserLoading: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default userReducer;
