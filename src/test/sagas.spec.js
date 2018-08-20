import test from 'tape';
import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils';
import { getUserList } from '../sagas/users'
import * as A from '../actions/users'

const products = [1],
  cart = [1] // dummy values
const state = { products, cart }
const getState = () => state

describe('with redux-saga-test', () => {
  it('gets the execution context', () => {
    const gen = getUserList();

    let next = gen.next();
    // console.log()
    // console.log();
    expect(next.value.PUT).toBe(put({type: 'USER_LIST_LOADING'}));
    // expect(gen.next().value).toEqual(put({ type: 'TOGGLE_LIST_LOADING' }));
  });
 
});

