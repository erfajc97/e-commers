import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Purchases = () => {
  const purchases = useSelector((state) => state.purchases);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  // console.log(purchases);
  return (
    <div className="container_general_purchases">
      <br />
      <br />
      <Link className="link-producid" as={Link} to={"/"}>
        Home
      </Link>
      <br />
      <br />
      <h2>Purchases</h2>

      <ul className="container_info_general_purchases">
        {purchases.map((purchase, i) => (
          <li className="list_purchases" key={i}>
            <Link
              style={{ listStyleType: "none", textDecoration: "none" }}
              to={`/product/${purchase.product.id}`}>
              <Container>
                <Row className="rowpurchases">
                  <Col>
                  <div className="container_img_purchases">

                    <img
                      className="img-purchase"
                      src={purchase.product?.images[0].url}
                      alt=""
                      />
                      </div>
                  </Col>
                  <Col>
                    <strong>{purchase.product?.title}</strong>
                  </Col>
                  <hr />
                  <Col className="date-purchases">
                    <span>{purchase.product?.createdAt.slice(0, 10)}</span>
                  </Col>
                  <Col >
                    <div className="container_quantity_purchases">

                  {purchase.quantity}
                    </div>
                  </Col>
                  <Col>{`$ ${purchase.product?.price}`}</Col>
                </Row>
              </Container>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
