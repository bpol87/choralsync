import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* memberCards (action) {
    try {
        const response = yield axios.get('/api/members/cards')
        yield put({type:'SET_MEMBER_CARDS', payload: response.data})
    } catch (err) {
        console.log('Error fetching member cards')
    }
}

function* fetchMemberProfile (action) {
    const memberId = action.payload

    const response = yield axios.get(`/api/members/${memberId}`)

    const memberProfile = response.data

    yield put({type: 'SET_MEMBER', payload: memberProfile})
}

function* membersSaga () {
    yield takeLatest('FETCH_MEMBER_CARDS', memberCards)
    yield takeLatest('FETCH_MEMBER', fetchMemberProfile)
}

export default membersSaga;