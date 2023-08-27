import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { createUserWithEmailAndPassword, sendEmailVerification, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { auth } from "/home/kefah/Documents/Devel0pment/projects/famr/farm/src/firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        username
      }),
    })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setSignupError("Password and confirmation do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);

      await sendEmailVerification(auth.currentUser);
    
      navigate("/");
    } catch (error) {
      console.log("Sign Up Error:", error.message);
      setSignupError(error.message); 
    }
  };

  return (
    <div>
      <Card>
        <Card.Body className='mx-auto'>
          <h2 className='text-center mb-4'>Signup</h2>
          <Form type="submit" onSubmit={handleSubmit}>
            {signupError && <Alert className="SignupError">{signupError}</Alert>}
            <Form.Group id="displayName"> 
              <Form.Label>User Name</Form.Label>
              <Form.Control className='w-80' type="text" value={username} required onChange={(e) => setuserName(e.target.value)} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className='w-80' type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
          <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className='w-80' type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group id="passwordconfirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control className='w-80' type="password" value={passwordConfirmation} required onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </Form.Group>
            <Button className='w-80 mt-4' type="submit">Signup</Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
     
    </div>
  );
}

export default Signup;
