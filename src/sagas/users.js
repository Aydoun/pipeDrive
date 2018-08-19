import { select, call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from '../constants/users';
import { OrderList } from '../actions/users';
import { SEND_NOTIFICATION } from '../constants/app';
import request from '../utils/request';
import { apiBase } from '../utils/config';
import { swapElements } from '../utils/';

function* getUserList() {
  const requestURL = `${apiBase}/persons`;

  const GETOptions = {
    method: 'GET',
    url: requestURL,
  };

  try {
    const res = yield call(request, GETOptions);
    

    yield put(OrderList(res.data.data));
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

function* alterOrder(data) {
  try {
    const { destinationId, sourceId, list } = data.payload;
    const newList = swapElements(list, sourceId, destinationId);
    yield put(OrderList(newList));
  } catch (err) {
    console.log(err);
  }
}

function* userListSaga() {
    yield takeLatest(C.USER_LIST_LOADING, getUserList);
}

function* alterOrderSaga() {
  yield takeLatest(C.ALTER_USER_ORDER, alterOrder);
}

export default [
  fork(userListSaga),
  fork(alterOrderSaga),
];
