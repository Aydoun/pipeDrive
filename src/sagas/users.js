import { call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from '../constants/users';
import { OrderList } from '../actions/users';
import { SEND_NOTIFICATION } from '../constants/app';
import request from '../utils/request';
import { apiBase, userOrder } from '../utils/config';
import { calculateOrder } from '../utils/';

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
    const { destinationIdx, draggableId, list } = data.payload;
    const draggableIdx = list.findIndex(l => l.id === draggableId);
    const endIdx = 10 * (Math.floor(draggableIdx / 10)) + destinationIdx;
    const newList = calculateOrder(list, draggableIdx, endIdx);

    yield put(OrderList(newList));
    
    const newOrderUser = newList[endIdx];
    const requestURL = `${apiBase}/persons/${newOrderUser['id']}`;
    const PUTOptions = {
      method: 'PUT',
      url: requestURL,
      data: {
        [userOrder]: newOrderUser[userOrder],
      },
    };

    yield call(request, PUTOptions);
  } catch (err) {
    yield put({
      type: SEND_NOTIFICATION,
      data: {
          type: 'error',
          message: 'Error While Persisting The Order',
      }
    });
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
