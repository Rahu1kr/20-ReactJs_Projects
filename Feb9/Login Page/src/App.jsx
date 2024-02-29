import { useState } from "react";
import "./App.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function App() {
  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="App">
        <div className="container">
          <div className="card_area">
            <h1 className="container_title">Back to your digital life</h1>
            <p className="container_para">Choose one of the option to go</p>
            <div className="input_card">
              <TextField
                className="input"
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
              <TextField
                className="input"
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </div>
            <div className="line">
              <p className="line_para">Or continue with</p>
            </div>
            <div className="social_card">
              <div className="google">
                <img src="./1.png" alt="" className="google_img" />
              </div>
              <div className="google">
                <img src="./2.png" alt="" className="google_img" />
              </div>
              <div className="google">
                <img src="./3.png" alt="" className="google_img" />
              </div>
            </div>
            <div className="card_button">
              <button className="button-28">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default App;
