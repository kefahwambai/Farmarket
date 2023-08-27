import React, { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Home/homepage";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
import ContactUs from "./components/Contact Us/ContactUs";
import Shop from "./components/Shop/Shop";
import { Reviews } from "./components/Mushrooms/Reviews";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import { NavBar } from "./components/NavBar/Navbar";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = [...cart];
    if (arr[ind].amount === undefined || isNaN(arr[ind].amount)) arr[ind].amount = 0;
    arr[ind].amount += d;
    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };

  return (
    <div className="App">
      {/* <NavBar /> */}
      <Homepage />
      <Routes>
        {user ? (
          <>
            <Route
              path="/"
              element={<Shop setCart={setCart} cart={cart} handleClick={handleClick} />}
            />
            <Route
              path="/cart"
              element={<Cart setCart={setCart} cart={cart} handleChange={handleChange} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/contact-us" element={<Reviews />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            < Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
