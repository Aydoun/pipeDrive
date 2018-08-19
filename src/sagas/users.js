import { call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from '../constants/users';
import { OrderList } from '../actions/users';
import { SEND_NOTIFICATION } from '../constants/app';
import request from '../utils/request';
import { apiBase } from '../utils/config';

function* getUserList(returnedData) {
  const requestURL = `${apiBase}/persons`;

  const GETOptions = {
    method: 'GET',
    url: requestURL,
  };

  try {
    const res = yield call(request, GETOptions);
    const userList = res.data.data.map(l => {
      return {
        ...l,
        order: l.id,
      };
    });

    yield put(OrderList(userList));
  } catch (err) {
    yield put({
        type: SEND_NOTIFICATION,
        data: {
            type: 'error',
            message: 'Error While Fetching Data, please try again!',
        }
    });
    console.log(err);
  }
}

function* userListSaga() {
    yield takeLatest(C.USER_LIST_LOADING, getUserList);
}

export default [
  fork(userListSaga)
];
