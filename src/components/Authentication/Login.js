import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "/home/kefah/Documents/Devel0pment/projects/famr/farm/src/firebase"
import { Link, useNavigate} from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



function Login() { 

   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();  

    try {      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      const user = userCredential.user;
      
      console.log("User Logged in:", user);
    } catch (error) {
      console.log("Login Error:", error.message);
      setLoginError(error.message); 
    }
  };

  const google = async (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }
 

  return (
    <div>
      <Card>
        <Card.Body className='mx-auto'>
          <h2 className='text-center mb-4'>Login</h2>
          <Form type="sumit" onSubmit={handleSubmit}>
             {loginError && <Alert className="SignupError">{loginError}</Alert>}           
             <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className='w-80' type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className='w-80' type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <br/>
            <br/>
           
            <Button className='w-80' type="submit">Login</Button>
            <br/>
            <br/>
            <p className="text-center">Or</p>
           
            <Button className='w-80' type="submit" onSubmit={(google)}>Sign In with Google</Button>                      
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
        </Card.Body>
      </Card>
     
    </div>
  )
}

export default Login;