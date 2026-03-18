import { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";

function Login() {

  const [mode,setMode] = useState("login");

  return (

    <div className="login-container">

      {/* ECG BACKGROUND */}

      <div className="ecg-container">

        <div className="ecg-track">

          {/* ECG LINE 1 */}
          <svg viewBox="0 0 600 200">
            <polyline
            points="
            0,100
            60,100
            80,100
            100,20
            110,100
            120,180
            130,100
            200,100
            260,100
            280,20
            290,100
            300,180
            310,100
            380,100
            440,100
            460,20
            470,100
            480,180
            490,100
            600,100
            "
            fill="none"
            stroke="#00ff9c"
            strokeWidth="4"
            />
            </svg>

          {/* ECG LINE 2 */}
          <svg viewBox="0 0 600 200">
           <polyline
            points="
            0,100
            60,100
            80,100
            100,20
            110,100
            120,180
            130,100
            200,100
            260,100
            280,20
            290,100
            300,180
            310,100
            380,100
            440,100
            460,20
            470,100
            480,180
            490,100
            600,100
            "
            fill="none"
            stroke="#00ff9c"
            strokeWidth="4"
            />
            </svg>

          {/* ECG LINE 3 */}
          <svg viewBox="0 0 600 200">
           <polyline
            points="
            0,100
            60,100
            80,100
            100,20
            110,100
            120,180
            130,100
            200,100
            260,100
            280,20
            290,100
            300,180
            310,100
            380,100
            440,100
            460,20
            470,100
            480,180
            490,100
            600,100
            "
            fill="none"
            stroke="#00ff9c"
            strokeWidth="4"
            />
            </svg>

        </div>

      </div>


      {/* LOGIN CARD */}

        <div className="login-card">

        <img src={logo} className="logo" />

        <h1>PulseTrack</h1>
        <p>Monitor your heart health</p>

        {mode==="login" && (
          <>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>

            <button className="main-btn">
              Login
            </button>

            <span
              className="switch"
              onClick={()=>setMode("register")}
            >
              Create Account
            </span>

            <span className="forgot">
              Forgot Password?
            </span>
          </>
        )}

        {mode==="register" && (
          <>
            <input type="text" placeholder="Full Name"/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>

            <button className="main-btn">
              Create Account
            </button>

            <span
              className="switch"
              onClick={()=>setMode("login")}
            >
              Back to Login
            </span>
          </>
        )}

      </div>

    </div>

  );
}

export default Login;