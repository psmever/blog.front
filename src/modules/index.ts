import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { all } from 'redux-saga/effects';
import * as _CommonTypes_ from 'modules/commonTypes';

import base from './redux/base';
import baseSagas from './redux/base/sagas';

export interface RootState {
    router: RouterState
    base: _CommonTypes_.baseSagaState
}

export const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    base: base,
});

export function* rootSaga() {
    yield all([
        ...baseSagas,
    ]);
}