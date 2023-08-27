import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateMushroom from "../Mushrooms/Reviews";
import DeleteMushroom from "../Mushrooms/DeleteMushroom";

import css from './shop.css';

function Shop({ cart, setCart }) {
  const [vegetables, setVegetables] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetch("http://localhost:3000/vegetables")
      .then((res) => res.json())
      .then((vegetables) => setVegetables(vegetables))
      .catch((error) => console.error(error));
  }, []);


  function handleClick(vegetables) {
    if (vegetables) {
      
      
      setCart([...cart, vegetables]);
      // setMushrooms((prevMushrooms) =>
      //   prevMushrooms.map((m) => (m.id === mushroom.id ? updatedMushroom : m))
      // );
    }
  }


  return (
    <div className="shop">
      <div className="mushrooms">
        <div className="product-grid">
          {vegetables.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image_url} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p>{item.nutritional_benefit}</p>
                <p> $ {item.price}</p>                
                 <button className="btn btn-primary" disabled={item.stock === 0} onClick={() => handleClick(item)}>
                  {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <br/>              
              </div>
            </div>
              ))}
            </div>
          </div>        
        </div>
  );
}

export default Shop;



             



