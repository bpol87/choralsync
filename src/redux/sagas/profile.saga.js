import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* profileInfo(action) {
  try {
    const response = yield axios.put(
      "/api/profile/profile-info",
      action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    yield put({ type: "FETCH_USER" });
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
    yield put({ type: "FETCH_USER" });
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
    yield put({ type: "FETCH_USER" });
  } catch (err) {
    console.log("Set Profile error:", err);
  }
}

function* aboutInfo(action) {
  try {
    const response = yield axios.put("/api/profile/about-info", action.payload);
    yield put({ type: "FETCH_USER" });
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
    yield put({ type: "FETCH_USER" });
  } catch (err) {
    console.log("Set Profile error:", err);
  }
}

function* fetchUserProfile(action) {
  try {
    const userId = action.payload;
    console.log("userId is:", userId);

    const response = yield axios.get(`/api/profile/user/${userId}`);
    console.log("Profile fetched successfully:", response.data);

    yield put({ type: "SET_USER_PROFILE", payload: response.data });
  } catch (error) {
    console.log("Error fetching user profile:", error);
  }
}

function* submitProfile(action) {
  const history = action.payload;
  try {
    const response = yield axios.put("/api/profile/user");
    if (response) {
      const profileFetched = yield axios.get("/api/profile/user");
      if (profileFetched) {
        yield history.push("/user");
      }
    }
  } catch (err) {
    console.log("Error submitting profile", err);
  }
}

function* editProfile(action) {
  try {
    const response = yield axios.put("/api/profile/edit", action.payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {}
}

function* profileSaga() {
  yield takeLatest("SUBMIT_PROFILE", profileInfo);
  yield takeLatest("SUBMIT_CONTACT", contactInfo);
  yield takeLatest("SUBMIT_EMERGENCY", emergencyInfo);
  yield takeLatest("SUBMIT_ABOUT", aboutInfo);
  yield takeLatest("SUBMIT_SOCIAL", socialInfo);
  yield takeLatest("FETCH_USER_PROFILE", fetchUserProfile);
  yield takeLatest("SUBMIT_FULL_PROFILE", submitProfile);
  yield takeLatest("SUBMIT_EDITS_TO_MEMBER", editProfile);
}

export default profileSaga;
