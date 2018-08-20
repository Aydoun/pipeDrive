import { SEND_NOTIFICATION } from '../constants/app';

const initialState = {
  notificationData: {
    type: '',
    text: '',
  },
  notificationKey: 0,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return Object.assign({}, state, {
        notificationKey: state.notificationKey + 1,
        notificationData: action.data
      });
    default:
      return state;
  }
}

export default appReducer;
