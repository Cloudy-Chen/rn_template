// import sagas to start
import { all } from 'redux-saga/effects';
import dataSagas from '../saga/data-saga';
import notificationSagas from '../saga/notification-saga';
import authSagas from '../saga/auth-saga';
import settingSagas from '../saga/setting-saga';

// when add new sagas, we should update this object
const sagas = [
  ...dataSagas,
  ...notificationSagas,
  ...authSagas,
  ...settingSagas,
];

export function* rootSaga() {
  yield all([...sagas]);
}
