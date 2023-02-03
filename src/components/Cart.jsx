import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { deleteProductCarThunk, getCartThunk, purchasesCartThunk, updateCartThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const addProduct = useSelector(state => state.cart)
    const dispatch = useDispatch();
    
   
      let total = 0
      addProduct.forEach((product) => {
        const productTotal = Number(product.product.price) * product.quantity;
        total += productTotal;
      });
    
     


    useEffect(()=>{
        dispatch(getCartThunk());
    },[])

      const incrementRate = (product) => {
        dispatch(updateCartThunk(product.id, product.quantity + 1));
      };

      const decrementRate = (product) => {
        dispatch(updateCartThunk(product.id, product.quantity - 1));
      };

  return (
    <Offcanvas placement="end" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="container_all_cart">
          {addProduct.map((product, i) => (
            <div key={i} className="separador">
              <div className="container_cart_general">
                <div className="container_img_cart">
                  <img
                    className="img_cart"
                    src={product.product.images[0].url}
                    style={{ width: 200 }}
                    alt=""
                  />
                </div>
                <div className="container_info_cart">
                  <div>
                    <strong>{product.product?.title}</strong>
                    <div className="quaintity-info">
                      <button
                        disabled={product.quantity === 1}
                        onClick={() => decrementRate(product)}
                        className="btn-quantity">
                        {" "}
                        -{" "}
                      </button>
                      <div className="btn-quantity">{product.quantity}</div>
                      <button
                        onClick={() => incrementRate(product)}
                        className="btn-quantity">
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        dispatch(deleteProductCarThunk(product.id))
                      }
                      className="btndelete-cart">
                      <i className="bx bxs-trash bx-sm"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="price-total">
                <span>Total:</span>
                <strong>{`$${
                  product.quantity * parseInt(product.product?.price)
                }`}</strong>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />

        <div className="sumTotal">
          <span>Total:</span>
          <strong>{`$ ${total}`}</strong>
        </div>
        <br />
        <br />
        <br />
        <br />

        <div className="container_checkOut">
          <button
            className="btn-CheckOut"
            onClick={() => dispatch(purchasesCartThunk())}>
            CheckOut
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;