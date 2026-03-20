import { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

//  Firebase imports
import { auth } from "../firebase/config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

function Login() {

  const [mode,setMode] = useState("login");
  //  states
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  //  LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // alert("Login successful");
      // console.log(user.user);
       navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    }
  };

  //  SIGNUP FUNCTION
  const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created");
    setEmail("");
    setPassword("");
    setMode("login"); 

  } catch (err) {
    alert(err.message);
  }
};
  
  //reset password function
  const handleForgotPassword = async () => {

  if (!email) {
    alert("Please enter your email first");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");

  } catch (err) {
    alert(err.message);
  }

};

  return (

    <div className="login-container">

      {/* ECG BACKGROUND */}
      <div className="ecg-container">
        <div className="ecg-track">

          {/* ECG LINE */}
          {[1,2,3].map((_,i)=>(
            <svg key={i} viewBox="0 0 600 200">
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
          ))}

        </div>
      </div>

      {/* LOGIN CARD */}
      <div className="login-card">

        <img src={logo} className="logo" />

        <h1>PulseTrack</h1>
        <p>Monitor your heart health</p>

        {/*  LOGIN FORM */}
        {mode==="login" && (
          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="main-btn" type="submit">
              Login
            </button>

            <span className="switch" onClick={()=>setMode("register")}>
              Create Account
            </span>

            <span className="forgot" onClick={handleForgotPassword}>
              Forgot password?
            </span>
          </form>
        )}

        {/*  SIGNUP FORM */}
        {mode==="register" && (
          <form onSubmit={handleSignup}>
          Create Your Account
            <input
              type="email"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="main-btn" type="submit">
              Create Account
            </button>

            <div
              className="switch"
              onClick={()=>setMode("login")}
            >
              Back to Login
              </div>
           

          </form>
        )}

      </div>

    </div>
  );
}

export default Login;