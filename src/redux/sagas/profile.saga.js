import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* profileInfo(action) {
  try {
    const response = yield axios.put(
      "/api/profile/profile-info",
      action.payload
    );
    yield put({type: "FETCH_USER"})
  } catch (err) {
    console.log("Set Profile error:", err);
  }
}

function* contactInfo(action) {
  try {
    const response = yield axios.put(
      "/api/profile/contact-info",
      action.payload
    );
    yield put({type: "FETCH_USER"})
  } catch (err) {
    console.log("Set Profile error:", err);
  }
}

function* emergencyInfo(action) {
  try {
    const response = yield axios.put(
      "/api/profile/emergency-info",
      action.payload
    );
    yield put({type: "FETCH_USER"})
  } catch (err) {
    console.log("Set Profile error:", err);
  }
}

function* aboutInfo(action) {
    try {
      const response = yield axios.put(
        "/api/profile/about-info",
        action.payload
      );
      yield put({type: "FETCH_USER"})
    } catch (err) {
      console.log("Set Profile error:", err);
    }
  }

  function* socialInfo(action) {
    try {
      const response = yield axios.put(
        "/api/profile/social-info",
        action.payload
      );
      yield put({type: "FETCH_USER"})
    } catch (err) {
      console.log("Set Profile error:", err);
    }
  }

  function* fetchUserProfile (action) {
    try {
      const response = yield axios.get("/api/profile/user", action.payload)
      yield put({type:"SET_USER_PROFILE", payload: response.data[0]})
    } catch {

    }
  }

function* profileSaga() {
  yield takeLatest("SUBMIT_PROFILE", profileInfo)
  yield takeLatest("SUBMIT_CONTACT", contactInfo)
  yield takeLatest("SUBMIT_EMERGENCY", emergencyInfo)
  yield takeLatest("SUBMIT_ABOUT", aboutInfo)
  yield takeLatest("SUBMIT_SOCIAL", socialInfo)
  yield takeLatest("FETCH_USER_PROFILE", fetchUserProfile)
}

export default profileSaga;
