import { select, call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from '../constants/users';
import { OrderList } from '../actions/users';
import { sendNotification } from '../actions/app';
import * as api from '../utils/request';
import { apiBase, userOrder } from '../utils/config';
import { calculateOrder, newOrder } from '../utils/';

export function* getUserList() {
  const requestURL = `${apiBase}/persons`;
  const GETOptions = {
    method: 'GET',
    url: requestURL,
  };

  try {
    yield put({ type: C.TOGGLE_LIST_LOADING, loading: true });

    const res = yield call(api.request, GETOptions);

    yield put(OrderList(res.data.data));
    yield put({ type: C.TOGGLE_LIST_LOADING, loading: false });
  } catch (err) {
    yield put(sendNotification('error', 'Error While Fetching Data, please try again!'));
    yield put({ type: C.TOGGLE_LIST_LOADING, loading: false });
  }
}

export function* alterOrder(data) {
  try {
    const list = yield select(state => state.users.userList);
    const { destinationIdx, draggableId } = data.payload;
    const draggableIdx = list.findIndex(l => l.id === draggableId);
    const endIdx = 10 * (Math.floor(draggableIdx / 10)) + destinationIdx;
    const newList = calculateOrder(list, draggableIdx, endIdx);

    if (draggableIdx === destinationIdx) {
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
    yield call(api.request, PUTOptions);
  } catch (err) {
    yield put(sendNotification('error', 'Error While Persisting The Order'));
  }
}

function* persistUser(data) {
  try {
    yield put({ type: C.TOGGLE_ADD_USER, loading: true });
    const list = yield select(state => state.users.userList);
    const orderedData = Object.assign({}, data.payload, {
      [userOrder]: newOrder(list),
    });
    const requestURL = `${apiBase}/persons`;
    const POSTOptions = {
      method: 'POST',
      url: requestURL,
      data: orderedData,
    };

    const res = yield call(api.request, POSTOptions);

    yield put({ type: C.TOGGLE_ADD_MODAL, userAddModal: false });
    yield put(OrderList(list.concat([res.data.data])));
    yield put({ type: C.TOGGLE_ADD_USER, loading: false });
    yield put(sendNotification('success', 'New Person is Successfully Added'));

  } catch (err) {
    yield put(sendNotification('error', 'Error While Adding new Person'));
    yield put({ type: C.TOGGLE_ADD_USER, loading: false });
  }
}

function* deleteUser(data) {
  try {
    yield put({ type: C.TOGGLE_DELETE_USER, loading: true });
    const list = yield select(state => state.users.userList);
    const requestURL = `${apiBase}/persons/${data.id}`;
    const DELETEOptions = {
      method: 'DELETE',
      url: requestURL,
    };

    yield call(api.request, DELETEOptions);
    yield put({ type: C.TOGGLE_USER_DETAILS, userDetailModal: false });
    yield put(OrderList(list.filter(l => l.id !== data.id)));
    yield put({ type: C.TOGGLE_DELETE_USER, loading: false });
    yield put(sendNotification('success', 'Person is Successfully Deleted'));
  } catch (err) {
    yield put(sendNotification('error', 'Error While Deleting The Person Person'));
    yield put({ type: C.TOGGLE_DELETE_USER, loading: false });
  }
}

function* userListSaga() {
  yield takeLatest(C.USER_LIST_LOADING, getUserList);
}

function* alterOrderSaga() {
  yield takeLatest(C.ALTER_USER_ORDER, alterOrder);
}

function* addUserSaga() {
  yield takeLatest(C.ADD_USER, persistUser);
}

function* deleteUserSaga() {
  yield takeLatest(C.DELETE_USER, deleteUser);
}

export default [
  fork(userListSaga),
  fork(alterOrderSaga),
  fork(addUserSaga),
  fork(deleteUserSaga),
];
