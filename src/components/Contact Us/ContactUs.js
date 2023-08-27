import React, { useState } from 'react';
import css from './contact.css'

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the form data to a server or API
    // For this example, we'll just log the form data to the console
    console.log({ name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <p>Feel free to contact us with any questions or feedback!</p>
      <div>
        <h3>Address</h3>
        <p>123 Main St.</p>
        <p>City, State Zip</p>
        <h3>Phone</h3>
        <p>(123) 456-7890</p>
        <h3>Email</h3>
        <p>contact@yourwebsite.com</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
