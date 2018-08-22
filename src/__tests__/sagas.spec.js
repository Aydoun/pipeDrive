import { runSaga } from 'redux-saga';
import { OrderList } from '../actions/users';
import { sendNotification } from '../actions/app';
import { getUserList, alterOrder } from '../sagas/users';
import * as C from '../utils/config';
import * as api from '../utils/request';

describe('User Saga', () => {
  it('it should load a list of persons',async () => {
    const dispatched = [];
    const fakeApiData = {
      data: {
        data: [],
      }
    };

    api.request = jest.fn(() => Promise.resolve(fakeApiData));
    
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ }),
    }, getUserList).done;

    expect(api.request.mock.calls.length).toBe(1);
    expect(dispatched).toContainEqual(OrderList([]));
  });

  it('it should throw an excetion in case of Error',async () => {
    const dispatched = [];
    const error = {
      type: 'error',
      text: 'Error While Fetching Data, please try again!'
    };

    api.request = jest.fn(() => Promise.reject(error));

    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({  }),
    }, getUserList).done;

    expect(api.request.mock.calls.length).toBe(1);
    expect(dispatched).toContainEqual(sendNotification(error.type, error.text));
  });

  it('it should alter order Correctly',async () => {
    const dispatched = [];
    C.userOrder = 'order';
    const fakeUserList = [
      {
        id: 0,
        name: 'fake1',
        order: 1,
      },
      {
        id: 1,
        name: 'fake2',
        order: 2,
      },
    ];

    api.request = jest.fn(() => Promise.resolve({}));

    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ users: { userList: fakeUserList } }),
    }, alterOrder, { payload: { destinationIdx: 1, draggableId: 0 } }).done;

    expect(api.request.mock.calls.length).toBe(1);
    expect(dispatched).toContainEqual(OrderList(fakeUserList));
  });
});

