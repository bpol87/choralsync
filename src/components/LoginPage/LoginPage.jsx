import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  return (
    <div className="flex flex-col items-center m-4">
      <LoginForm />

      <center>
        <button
          type="button"
          className="shadow-lg rounded-full w-52 py-2 px-6 m-2   text-white bg-teal-600"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
