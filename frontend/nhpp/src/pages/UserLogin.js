import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  console.log(username, password)

  async function loginSubmit(e) {
    e.preventDefault();
    // handleValidation();
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/api-token-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      // console.log(JSON.stringify({
      //   username: username,
      //     password: password
      //   }))
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/'
      } else {
        localStorage.removeItem('token');
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(localStorage.getItem('token'))

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <h1>Login</h1>
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="username"
                  className="form-control"
                  id="UsernameInput"
                  name="UsernameInput"
                  aria-describedby="UsernameHelp"
                  placeholder="Enter username"
                  onChange={(event) => setUsername(event.target.value)}
                />
                {/* <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small> */}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                {/* <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small> */}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;