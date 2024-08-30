import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="w-full">
      <h2>{heading}</h2>

      <div className="flex flex-col items-center">
        <RegisterForm />
        <h4>Already a Member?</h4>
        <button
          className="border border-slate-600 rounded-full px-6 m-4"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
