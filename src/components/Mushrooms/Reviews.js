import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Reviews = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedBack] = useState('');
  const navigate = useNavigate();    

  function handleSubmit(e) {

    e.preventDefault()

    return (
      fetch('http://localhost:3000/reviews', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          feedback,
        }),
      })
      .then(() =>{
        navigate("/");
      })
      .catch((error) => {
        console.log('Failed to submit', error)
      })     
    )
  }


  return (


    <div className="feedback-form">
        <form action="/submit-feedback" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username-form" name="username" value={username} required onChange={(e) => setUserName(e.target.value)}/>
        <br/>

        <label for="email">Email:</label>
        <input type="email" id="email-form" name="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
          <br/>

        <label for="feedback">Feedback:</label>
        <br/>
        <textarea id="feedback" name="feedback-form" rows="4" cols="50" value={feedback} required onChange={(e) => setFeedBack(e.target.value)}></textarea>
        <br/>

        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>

    </div>
    
  


  )
}
