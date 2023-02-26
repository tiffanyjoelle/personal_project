// user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')  
// user.is_staff=True 
// user.save()

//When signing up, please make sure to enter name exactly as it appears on the permit.

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [officeCode, setOfficeCode] = useState("");
  
  // console.log(username, password)
  async function getMatchingFacilities(firstName, lastName) {
    const res = await fetch('http://127.0.0.1:8000/api/');
    const body = await res.json();
  
    // Filter facilities based on first and last name matches
    const matchingFacilities = body.result.filter(facility => {
      const primaryRso = facility.primary_rso;
      return primaryRso.first_name === firstName && primaryRso.last_name === lastName;
    });
  
    return matchingFacilities;
  }

  async function signupSubmit(e) {
    e.preventDefault();
    // handleValidation();
    // find office_code associated with user registration
    try {
      const matchingFacilities = await getMatchingFacilities(firstName, lastName);
      console.log(matchingFacilities);
      if (matchingFacilities.length === 1) {
        const officeCode = matchingFacilities[0].office_code;
        const response = await fetch('http://127.0.0.1:8000/accounts/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            office_code: officeCode
          })
        });
      // console.log(JSON.stringify({
      //     username: username,
      //     password: password,
      //     first_name: firstName,
      //     last_name: lastName,
      //     office_code: officeCode
      //   }))
        if (response.ok) {
          //set success message
          window.location.href = '/';
        } else {
          localStorage.removeItem('token');
          throw new Error('Cannot create account');
        }
      } else {
        // handle error when there are multiple matching facilities or no matching facilities
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
            <form id="loginform" onSubmit={signupSubmit}>
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
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="first_name"
                  className="form-control"
                  id="FirstNameInput"
                  name="FirstNameInput"
                  placeholder="Enter first name"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="last_name"
                  className="form-control"
                  id="LastNameInput"
                  name="LastNameInput"
                  placeholder="Enter last name"
                  onChange={(event) => setLastName(event.target.value)}
                />
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
export default Signup;