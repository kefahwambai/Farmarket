import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "./cart.css";

function Cart({ cart, setCart, handleChange }) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let ans = 0;
    cart.forEach((item) => {
      if (item.price && item.amount) {
        ans += item.price * item.amount;
      }
    });
    setTotalPrice(ans);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, [setCart]);

  const handleRemove = (item) => {
    setCart(cart.filter((i) => i !== item));
  };

  const sendOrderToBackend = async (order) => {
    try {
      const response = await fetch("http://localhost:9292/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      console.log(data);
      setCart([]);
      localStorage.removeItem("cart");
      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    const order = {
      order: {
        total: totalPrice,
        items: JSON.stringify(
          cart.map((item) => ({
            mushroom_id: item.id,
            quantity: item.amount,
            price: item.price,
          }))
        ),
      },
    };
    sendOrderToBackend(order);
  };
  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="empty-cart">No items in cart</div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>Ksh {item.price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleChange(item, -1)}
                    >
                      -
                    </Button>
                    <span className="quantity">{item.amount}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleChange(item, 1)}
                    >
                      +
                    </Button>
                  </td>
                  <td>KSh {(item.amount * item.price).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="total-price">
            Total Price: Ksh {isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2)}
          </div>
          <Button
            className="place-order-btn"
            variant="primary"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? "Placing Order..." : "Place Order"}
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;

