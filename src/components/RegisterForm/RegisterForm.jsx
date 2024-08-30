import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form
      className="flex flex-col border border-slate-900 bg-white w-96 items-center rounded-lg shadow-lg p-4 mb-4 "
      onSubmit={registerUser}
    >
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="flex flex-col items-center m-4">
        <label htmlFor="username">Email Address:</label>
        <input
          className="border border-slate-700 rounded-md shadow-md ml-2"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="flex flex-col items-center m-4">
        <label htmlFor="password">Password:</label>
        <input
          className="border border-slate-700 rounded-md shadow-md ml-2"
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button
          className="border border-slate-600 rounded-full px-6 m-4"
          type="submit"
          name="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
