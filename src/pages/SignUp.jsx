import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    axios
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/users", data)
      .then(() => {
        navigate("/login/");
      });
  };

  return (
    <div style={{ position: "relative" }} className="container_signUp">
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>Firts Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Jose"
            {...register("firstName")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Garcia"
            {...register("lastName")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="(xx)-xxx-xxx"
            {...register("phone")}
          />
        </Form.Group>
        <br />

        <Button
          style={{ position: "absolute", right: "0.5rem" }}
          variant="primary"
          type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
