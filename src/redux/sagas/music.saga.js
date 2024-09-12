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

function* deletePdf(action) {
    const { pdfId, concertId } = action.payload;
  
    try {
      yield call(axios.delete, `/api/tracks/delete-pdf/${pdfId}`);
      
      yield put({ type: 'FETCH_PDFS', payload: concertId });
    } catch (error) {
      console.error('Error deleting PDF:', error);
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
        const formData = action.payload;
        yield axios.post('/api/concerts/upload-tracks', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const concertId = formData.get("concertId");
        const sectionId = formData.get("userSectionId");

        yield put({ type: "FETCH_TRACKS", payload: { concertId, sectionId } });
    } catch (error) {
        console.error('Error uploading tracks:', error);
    }
}

function* fetchTracks(action) {
    try {
        console.log(action.payload)
        const concertId = action.payload.concertId;
        const sectionId = action.payload.sectionId;

        const response = yield axios.get(`/api/concerts/tracks/${concertId}?sectionId=${sectionId}`);
        
        const { sectionTracks, balancedTracks } = response.data;

        yield put({ type: 'SET_SECTION_TRACKS', payload: sectionTracks });

        yield put({ type: 'SET_BALANCED_TRACKS', payload: balancedTracks });
    } catch (err) {
        console.log("Error fetching tracks:", err);
    }
}

function* deleteTrack(action) {
    try {
        const trackId = action.payload.trackId;
        const sectionId = action.payload.sectionId;
        const concertId = action.payload.concertId;
        const response = yield axios.delete(`/api/concerts/delete-track/${trackId}`)
        yield put({type: 'FETCH_TRACKS', payload: { sectionId, concertId }})
    } catch (error) {
        console.error('Error deleting track:', error)
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
    //Concert Sagas
    yield takeLatest('FETCH_CONCERTS', fetchConcerts);
    yield takeLatest('ADD_CONCERT', addConcert);
    yield takeLatest('REMOVE_CONCERT', removeConcert);
    yield takeLatest('FETCH_ACTIVE_CONCERT', fetchActiveConcert);

    //PDF Sagas
    yield takeLatest('UPLOAD_PDFS', uploadPdfs);
    yield takeLatest('DELETE_PDF', deletePdf);
    yield takeLatest('FETCH_PDFS', fetchPDFs);

    //Tracks Sagas
    yield takeLatest('UPLOAD_TRACKS', uploadTracks);
    yield takeLatest('FETCH_TRACKS', fetchTracks);
    yield takeLatest('DELETE_REHEARSAL_TRACK', deleteTrack)
    
}

export default musicSaga;
