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

function* editMember(action) {
    const memberToEdit = action.payload
    const memberUser = action.payload.userId

    const response = yield axios.put(`/api/members/edit/${memberUser}`, action.payload)
    yield put({type: 'FETCH_MEMBER', payload: memberUser})
}

function* membersSaga () {
    yield takeLatest('FETCH_MEMBER_CARDS', memberCards)
    yield takeLatest('FETCH_MEMBER', fetchMemberProfile)
    yield takeLatest('SUBMIT_EDITS_TO_MEMBER', editMember)
}

export default membersSaga;