import React, { useState, useEffect } from 'react';
import css from './homepage.css';
import { Button } from "react-bootstrap"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from "/home/kefah/Documents/Devel0pment/projects/famr/farm/src/firebase"
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Homepage = ({ cart }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState('');  
  const size = cart ? cart.reduce((total, item) => {
    return total + item.amount;
  }, 0) : 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setMessage("Successfully Logged out! Please Login");
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.errormessage;
        console.log("Failed to logout", errorMessage);
        setError("Failed to logout", errorMessage);
      });
  }

  return (
    <div>
      {/* Banner */}
      <div className='banner'>
        <p>FRESH . ORGANIC . NUTRITIOUS</p>
      </div>
      <nav>
        <div className="nav_box">
          <NavLink to="/"><span className="my_shop">Farmarket</span></NavLink>

          <div>
            {user && (
              <>
                <Link to="/about"><span className="others p-4">About</span></Link>
                <NavLink to="/cart"><span className="others p-4">Cart</span></NavLink>
                <NavLink to="/contact-us"><span className="others p-4">Contact Us</span></NavLink>
              </>
            )}
          </div>

          {user && (
            <div className='w-35 text-center mt-2'>
              <Button variant='link' onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Homepage;
