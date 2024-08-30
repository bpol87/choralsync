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
          className="border border-slate-600 rounded-full px-6 m-4"
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
