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

  const autoPopulateGen = () => {
    setUsername('erick.smith@example.com')
    setPassword('general')
  }

  const autoPopulateAdmin = () => {
    setUsername('benpollack87@gmail.com')
    setPassword('admin')
  }

  return (
    <form
      className="flex flex-col border border-slate-900 bg-white items-center rounded-lg shadow-lg p-4 mb-4"
      onSubmit={login}
    >
      <h2 className="text-2xl text-teal-700 font-bold"><span onClick={autoPopulateAdmin}>L</span>ogi<span onClick={autoPopulateGen}>n</span></h2>
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
          className="shadow-lg rounded-full w-52 py-2 px-6 m-2   text-white bg-teal-600"
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
