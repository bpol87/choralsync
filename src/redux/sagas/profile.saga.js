import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* profileInfo(action) {
  try {
    const response = yield axios.put(
      "/api/profile/profile-info",
      action.payload
    );
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
    } catch (err) {
      console.log("Set Profile error:", err);
    }
  }

function* profileSaga() {
  yield takeLatest("SUBMIT_PROFILE", profileInfo)
  yield takeLatest("SUBMIT_CONTACT", contactInfo)
  yield takeLatest("SUBMIT_EMERGENCY", emergencyInfo)
  yield takeLatest("SUBMIT_ABOUT", aboutInfo)
}

export default profileSaga;
