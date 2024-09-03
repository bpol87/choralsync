import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* profileInfo (action) {
try {
 const response = yield axios.put('/api/profile/profile-info', action.payload)
    
} catch (err) {
    console.log('Set Profile error:', err);
}
}


function* profileSaga() {
    yield takeLatest('SUBMIT_PROFILE', profileInfo);
  }
  
  export default profileSaga;