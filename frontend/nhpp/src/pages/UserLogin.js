import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  
  function handleSignupBtnClick(event) {
    window.location.href = "/signup"
  }

  async function loginSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // handleValidation();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/accounts/api-token-auth`, {
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
        alert('Login failed');
      }
    } catch (error) {
      alert('Something went wrong.')
      console.error(error);
    } finally {
      setLoading(false)
    }
  }
  // console.log(localStorage.getItem('token'))

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <h1>RAM Tracker</h1>
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="username"
                  className="form-control"
                  id="UsernameInput"
                  name="UsernameInput"
                  placeholder="Enter username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button> <Button onClick={handleSignupBtnClick}>Sign up</Button>
              {loading && <div>Loading...</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;