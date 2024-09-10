import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* fetchConcerts (action) {
    try {
    const response = yield axios.get(`/api/concerts`)

    const concerts = response.data
    console.log('concerts are:', concerts)

    yield put({type: 'SET_CONCERTS', payload: concerts})    
    } catch (err) {
        console.log('Error setting Concerts:', err)
    }
}

function* addConcert (action) {
    try {
        console.log('concert to add is:', action.payload)
        const response = yield axios.post('/api/concerts/add', action.payload)

        yield put({type: 'FETCH_CONCERTS'})
    } catch (err) {
        console.log('Error adding Concerts:', err)
    }
}

function* removeConcert (action) {
    const concertId = action.payload
    try {
        const response = yield axios.delete(`/api/concerts/delete/${concertId}`)
        yield put({type: 'FETCH_CONCERTS'})
    } catch (err) {
        console.log('Error removing Concerts:', err)
    }
}

function* musicSaga() {
    yield takeLatest('FETCH_CONCERTS', fetchConcerts)
    yield takeLatest('ADD_CONCERT', addConcert)
    yield takeLatest('REMOVE_CONCERT', removeConcert)
  }
  
  export default musicSaga;