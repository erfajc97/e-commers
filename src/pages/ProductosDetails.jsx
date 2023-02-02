import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addproductIdThunk } from "../store/slices/cart.slice";
import { filterProductThunk } from "../store/slices/products.slice";

const ProductosDetails = () => {
  const [counter, setCounter] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const productSuggested = useSelector((state) => state.products);
  const navigate = useNavigate();
  const filterAllProducts = productSuggested.filter(
    (product) => product.id !== Number(id)
  );
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        dispatch(filterProductThunk(res.data.category.id));
        //   console.log(res.data.category.id);
      });
  }, [id]);

  // console.log(product);

  const addProduct = () => {
      if (localStorage.getItem("token") === "") {
          navigate("/login/");
        } else {
    const productId = {
      quantity: quantity,
      productId: product.id,
    };
    dispatch(addproductIdThunk(productId));
  }
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

    const addProduct2 = (itemId) => {
      if (localStorage.getItem("token") === "") {
        navigate("/login/");
      } else {
        const productId = {
          quantity: 1,
          productId: itemId,
        };
        dispatch(addproductIdThunk(productId));
      }
    };
  return (
    <div className="container_principal_Details">
      <br />
      <br />
      <div className="container_principal_info_details">
        <div className="container_title_details">
          <h2
            className=" title_details border-3 border-bottom"
            style={{ cursor: `pointer` }}
            onClick={() => navigate("/")}>
            Home
          </h2>
          <i style={{ color: "red" }} className="bx bxs-circle bx-xs"></i>
          <h3 className="title_details " style={{ cursor: `pointer` }}>
            {" "}
            {product.title}{" "}
          </h3>
        </div>
        <div className="container_info_productos_details">
          <Carousel>
            <Carousel.Item>
              <div className="container_imgPrincipal">
                <img
                  className="img_product_datails"
                  src={product.images?.[0].url}
                  alt=""
                />
              </div>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="container_imgPrincipal">
                <img
                  className="img_product_datails"
                  src={product.images?.[1].url}
                  alt=""
                />
              </div>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="container_imgPrincipal">
                <img
                  className="img_product_datails"
                  src={product.images?.[2].url}
                  alt=""
                />
              </div>

              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className="container_info_description">
            <div className="container_info_details">
              <h3 style={{ color: "grey" }}> {product.brand} </h3>
              <h3 className="ps-3">
                <b>{product.title}</b>
              </h3>
              <div className="container_price_details">
                <div className="container_description phonedescription">
                  <p> {product.description} </p>
                </div>
                <p style={{ color: "grey" }}>Price:</p>
                <h4 className="ps-3">
                  <b>{product.price}</b>
                </h4>
              </div>

              <div className="container_quantity_details">
                <p style={{ color: "grey" }}>Quantity</p>
                <div className="container_buttons_quantity ms-5 ">
                  <button
                    disabled={quantity <= 1}
                    onClick={decrementQuantity}
                    style={{ width: "30px", height: "30px" }}>
                    {" "}
                    -{" "}
                  </button>

                  <input
                    style={{
                      width: "30px",
                      height: "30px",
                      paddingLeft: "0.5rem",
                    }}
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <button
                    style={{ width: "30px", height: "30px" }}
                    onClick={incrementQuantity}>
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={addProduct} className="add-to-card-details">
              Add to card <i className="bx bx-cart"></i>
            </button>
          </div>
          <div className="container_description pcdescription">
            <p> {product.description} </p>
          </div>
        </div>
        <br />

        <h4 style={{ color: "red" }}>Discover similars items</h4>
      </div>
      <br />
      <div className="container_suggested">
        <ul>
          {filterAllProducts.map((product) => (
            <li key={product.id} className="container_suggest_product">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="container_img_suggested border-3 border-bottom">
                <img
                  className="img_product"
                  src={product.images?.[0].url}
                  alt=""
                  style={{ width: 300 }}
                />
              </div>
              <br />
              <div className="container_info_products_details">
                <p style={{ color: "grey" }}> {product.brand} </p>
                <b className="ps-3"> {product.title} </b>
                <p style={{ color: "grey" }}>Price:</p>
                <b className="ps-3"> ${product.price} </b>

                <div className="container_buttom_cart">
                  <button
                    onClick={() => addProduct2(product.id)}
                    className="buttom_cart">
                    <i className="bx bx-cart-add bx-sm"></i>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductosDetails;
