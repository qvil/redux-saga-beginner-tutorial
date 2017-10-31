import { delay } from 'redux-saga'
import { put, takeEvery, all, call, race } from 'redux-saga/effects'

export function* helloSaga() {
    console.log("Hello Sagas!");
}

export function* incrementAsync() {
    yield call(delay, 1000)
    yield put({ type: "INCREMENT" })
}

export function* watchIncrementAsync() {
    yield takeEvery("INCREMENT_ASYNC", incrementAsync)
}

export function* raceTest() {
    const { first, second } = yield race({
        first: call(delay, 1000),
        second: call(delay, 2000),
    })

    console.log(`first : ${first}`) // first : true
    console.log(`second : ${second}`) // second : undefined
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        raceTest(),
    ])
}