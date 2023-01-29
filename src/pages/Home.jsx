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

  // console.log(category);

  return (
    <div className="container_principal_home">
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container_filters">
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

        <ul className="container_products_list">
          {productsList?.map((product) => (
            <li
              className="products_list"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}>
              <br />
              <div className="container_img_product">
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
                    position: "absolute",
                    bottom: "0.1rem",
                    right: "0.5rem",
                  }}
                  className="container_buttom_cart">
                  <button className="buttom_cart">
                    <i className="bx bx-cart-add bx-sm"></i>{" "}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
