import { select, call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from '../constants/users';
import { OrderList } from '../actions/users';
import { sendNotification } from '../actions/app';
import request from '../utils/request';
import { apiBase, userOrder } from '../utils/config';
import { calculateOrder } from '../utils/';

function* getUserList() {
  const requestURL = `${apiBase}/persons23321`;

  const GETOptions = {
    method: 'GET',
    url: requestURL,
  };

  try {
    yield put({
      type: C.TOGGLE_LIST_LOADING,
      loading: true,
    });
    const res = yield call(request, GETOptions);
    
    yield put(OrderList(res.data.data));
    yield put({
      type: C.TOGGLE_LIST_LOADING,
      loading: false,
    });
  } catch (err) {
    yield put(sendNotification('error', 'Error While Fetching Data, please try again!'));
    yield put({
      type: C.TOGGLE_LIST_LOADING,
      loading: false,
    });
    console.log(err);
  }
}

function* alterOrder(data) {
  try {
    const list = yield select(state => state.users.userList);
    const { destinationIdx, draggableId } = data.payload;
    const draggableIdx = list.findIndex(l => l.id === draggableId);
    const endIdx = 10 * (Math.floor(draggableIdx / 10)) + destinationIdx;
    const newList = calculateOrder(list, draggableIdx, endIdx);

    if(draggableIdx === destinationIdx) {
      return;
    }

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
    // console.log(PUTOptions, 'PUTOPTIONS');
    // yield call(request, PUTOptions);
  } catch (err) {
    yield put(sendNotification('error', 'Error While Persisting The Order'));
   
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
