import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "/home/kefah/Documents/Devel0pment/projects/famr/farm/src/firebase"
import { Link, useNavigate} from "react-router-dom"



function ForgotPassword() { 
  
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("")
 

  const handleSubmit = async (e) => {
    e.preventDefault();  

     resetPassword(e)
  };

  function resetPassword(e){
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
    .then(() => {
        // navigate('/login')
        setMessage("Success! Check your inbox for further instruction")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode, errorMessage)
    });


  }
 

  return (
    <div>
      <Card>
        <Card.Body className='mx-auto'>
          <h2 className='text-center mb-4'>Password Reset</h2>
          <Form type="sumit" onSubmit={handleSubmit}>
             {loginError && <Alert variant="danger" className="SignupError">{loginError}</Alert>}
             {message && <Alert variant="success">{message}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control className='w-80' type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>  
            <br/>         
            <Button className='w-80' type="submit" onSubmit={resetPassword}>Reset Password</Button>                      
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/login">Login</Link>
          </div>
          <div className='w-100 text-center mt-2'>
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </Card.Body>
      </Card>
     
    </div>
  )
}

export default ForgotPassword;