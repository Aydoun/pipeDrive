import test from 'tape';
import fromGenerator from 'redux-saga-test';
// const fromGenerator = require('redux-saga-test')
import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils';
import { getUserList } from '../sagas/users'
import * as A from '../actions/users'


test('saga', (t) => {
  expect(1 + 1).toBe(2);
});

// describe('with redux-saga-test', () => {
//   it('gets the execution context', (t) => {
//     const expect = fromGenerator(t, getUserList())
//     expect.next().put({type: 'FETCHING'})
//   });



// });

