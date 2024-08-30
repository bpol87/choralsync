import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <form
      className="flex flex-col border border-slate-900 items-center rounded-lg shadow-lg p-4 mb-4"
      onSubmit={login}
    >
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className="flex flex-col items-center m-4">
        <label>Username:</label>
        <input
          className="border border-slate-700 rounded-md shadow-md ml-2"
          type="text"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="flex flex-col items-center m-4">
        <label htmlFor="password">Password:</label>
        <input
          className="border border-slate-700 rounded-md shadow-md ml-2"
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
        <button
          className="border border-slate-600 rounded-full px-6 m-4"
          type="submit"
          name="submit"
          value="Log In"
        >
          Log In
        </button>
    </form>
  );
}

export default LoginForm;
