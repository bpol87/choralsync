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

function* uploadPdfs(action) {
    try {
      const formData = action.payload;
  
      const response = yield axios.post("/api/pdfs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      yield put({ type: "FETCH_CONCERTS" });
    } catch (err) {
      console.log("Error uploading PDFs:", err);
    }
  }

function* fetchActiveConcert (action) {
    try {
        const concertId = action.payload;
        const response = yield axios.get(`/api/concerts/active/${concertId}`)

        const activeConcert = response.data;

        yield put({type: 'SET_ACTIVE_CONCERT', payload: activeConcert})

    } catch (error) {
        console.log("Error uploading PDFs:", error);
    }
}

function* musicSaga() {
    yield takeLatest('FETCH_CONCERTS', fetchConcerts)
    yield takeLatest('ADD_CONCERT', addConcert)
    yield takeLatest('REMOVE_CONCERT', removeConcert)
    yield takeLatest("UPLOAD_PDFS", uploadPdfs)
    yield takeLatest('FETCH_ACTIVE_CONCERT', fetchActiveConcert)
  }
  
  export default musicSaga;