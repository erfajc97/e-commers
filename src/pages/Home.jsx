import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Form,
  InputGroup,
  Offcanvas,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addproductIdThunk } from "../store/slices/cart.slice";

import {
  filterProductThunk,
  filterTitleThunk,
  getProductsTrunk,
} from "../store/slices/products.slice";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [productsFiltrados, setProductsFiltrados] = useState([]);

  useEffect(() => {
    setProductsFiltrados(productsList);
  }, [productsList]);

 

  const range = () => {
    
    const filterAllProducts = productsList.filter((product) => {
      return +product.price <= +max && +product.price >= +min;
    });

    setProductsFiltrados(filterAllProducts);
  };

  const myStylesButton = {
    display: "flex",
    justifyContent: "end",
    margin: "2rem 0",
  };

  useEffect(() => {
    dispatch(getProductsTrunk());

    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
      .then((res) => setCategory(res.data));
  }, []);

  const addProduct = (itemId) => {
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
    <div className="container_principal_home">
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container_filters">
            <br /> <br />
            <Accordion
              className=" accordion pe-5 ps-5 mt-5 mb-5"
              defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3>Prices</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <form onSubmit={range}>
                    <div className="form-group">
                      <label htmlFor="minPrice">Precio Mínimo:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="minPrice"
                        name="min"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="maxPrice">Precio Máximo:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="maxPrice"
                        name="max"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                      Filtrar
                    </button>
                  </form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion
              className=" accordion pe-5 ps-5 mt-5 mb-5"
              defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3>Category</h3>
                </Accordion.Header>
                <Accordion.Body>
                  {category.map((category) => (
                    <p
                      className="category_list border-1 border-bottom"
                      onClick={() => {
                        dispatch(filterProductThunk(category.id));
                        handleClose();
                      }}
                      key={category.id}>
                      {category.name}
                    </p>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="container_products">
        <div className="container_button_search">
          <br />
          <br />
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search your Product"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />

            <Button
              style={{ backgroundColor: "red", color: "#fff" }}
              onClick={() => dispatch(filterTitleThunk(searchProduct))}
              variant="outline-secondary"
              id="button-addon2">
              <i className="bx bx-search-alt-2 bx-md"></i>
            </Button>
          </InputGroup>
        </div>

        <div style={myStylesButton} className="container_filter_button">
          <Button variant="primary" className="d-lg-none" onClick={handleShow}>
            <i className="bx bx-filter-alt"></i>
          </Button>
        </div>

        <div className="container_products_list">
          {productsFiltrados?.map((product) => (
            <div className="products_list" key={product.id}>
              <br />
              <div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="container_img_product">
                  <img
                    className="img_product"
                    src={product.images[0].url}
                    alt=""
                    style={{ width: 300 }}
                  />
                </div>
                <br />
                <hr />
                <div
                  style={{ position: "relative" }}
                  className="container_info_products">
                  <p style={{ color: "grey" }}> {product.brand} </p>
                  <b className="ps-3"> {product.title} </b>
                  <p style={{ color: "grey" }}>Price:</p>
                  <b className="ps-3"> ${product.price} </b>

                  <div
                    style={{
                      // position: "absolute",
                      bottom: "0.1rem",
                      right: "0.5rem",
                      zIndex: "1001",
                    }}
                    className="container_buttom_cart">
                    <button
                      onClick={() => addProduct(product.id)}
                      className="buttom_cart">
                      <i className="bx bx-cart-add bx-sm"></i>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
