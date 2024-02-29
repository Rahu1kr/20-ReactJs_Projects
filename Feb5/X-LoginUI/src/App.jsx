import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="logo-box">
      <img src="./x.png" alt="x_logo" className="logo" />
      <h2>Sign In to X</h2>
      <button>
        <img src="./Google.png" alt="Google" />
        Sign in with Google
      </button>
      <button>
        <img src="./Apple.png" alt="Apple" />
        Sign in with Apple
      </button>
      <hr />
      <span>Or</span>
      <form>
        <input type="text" placeholder="Phone email or username" />
        <button>Next</button>
      </form>
      <button>Forget Password</button>
      <p>
        Don't Have an account? <a src="#"> Sign up</a>
      </p>
    </div>
  );
}

export default App;
