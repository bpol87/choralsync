import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Concerts
function* fetchConcerts(action) {
    try {
        const response = yield axios.get(`/api/concerts`);
        const concerts = response.data;
        yield put({ type: 'SET_CONCERTS', payload: concerts });
    } catch (err) {
        console.log('Error fetching concerts:', err);
    }
}

function* addConcert(action) {
    try {
        yield axios.post('/api/concerts/add', action.payload);
        yield put({ type: 'FETCH_CONCERTS' });
    } catch (err) {
        console.log('Error adding concert:', err);
    }
}

function* removeConcert(action) {
    try {
        const concertId = action.payload;
        yield axios.delete(`/api/concerts/delete/${concertId}`);
        yield put({ type: 'FETCH_CONCERTS' });
    } catch (err) {
        console.log('Error removing concert:', err);
    }
}

// PDFs
function* uploadPdfs(action) {
    try {
        const formData = action.payload;
        const response = yield axios.post(`/api/concerts/upload-pdf`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data);
        yield put({ type: "FETCH_PDFS", payload: formData.get("concertId") });
    } catch (err) {
        console.log("Error uploading PDFs:", err);
    }
}

function* fetchPDFs(action) {
    try {
        const concertId = action.payload;
        const response = yield axios.get(`/api/concerts/documents/${concertId}`);
        const pdfList = response.data;
        yield put({ type: 'SET_PDFS', payload: pdfList});
    } catch (err) {
        console.log("Error fetching PDFs:", err);
    }
}

// Tracks
function* uploadTracks(action) {
    try {
        yield axios.post('/api/concerts/upload-tracks', action.payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        yield put({ type: "FETCH_TRACKS", payload: action.payload.get("concertId") });
    } catch (error) {
        console.error('Error uploading tracks:', error);
    }
}

function* fetchTracks (action) {
    try {
        const concertId = action.payload;
        const response = yield axios.get(`/api/concerts/tracks/${concertId}`);
        const trackList = response.data;
        yield put({ type: 'SET_PDFS', payload: pdfList});
    } catch (err) {
        console.log("Error fetching PDFs:", err);
    }
}

// Active Concert
function* fetchActiveConcert(action) {
    try {
        const concertId = action.payload;
        const response = yield axios.get(`/api/concerts/active/${concertId}`);
        const activeConcert = response.data;
        yield put({ type: 'SET_ACTIVE_CONCERT', payload: activeConcert });
    } catch (error) {
        console.log("Error fetching active concert:", error);
    }
}

// Saga Watcher
function* musicSaga() {
    yield takeLatest('FETCH_CONCERTS', fetchConcerts);
    yield takeLatest('ADD_CONCERT', addConcert);
    yield takeLatest('REMOVE_CONCERT', removeConcert);
    yield takeLatest('UPLOAD_PDFS', uploadPdfs);
    yield takeLatest('FETCH_PDFS', fetchPDFs);
    yield takeLatest('UPLOAD_TRACKS', uploadTracks);
    yield takeLatest('FETCH_TRACKS', fetchTracks);
    yield takeLatest('FETCH_ACTIVE_CONCERT', fetchActiveConcert);
}

export default musicSaga;
