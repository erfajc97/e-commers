import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {

    console.log(data);
    
    axios
      .post(`https://e-commerce-api-v2.academlo.tech/api/v1/users/login`, data)
      .then((res) =>{
        console.log(res.data);

        localStorage.setItem("token", res.data.token)
        navigate('/')

      }
      )
      .catch(error =>{
        if(error.response.status === 401){
            alert("Contrasena incorrecta")
        }

        console.log(error);

      })
  };

  return (
    <div style={{ position: "relative" }} className="container_login">
      <br />
      <br />
      <div className="container_credenciales">
        <strong className="welcome_login">
          Welcome! Enter your email and password to continue
        </strong>
        <br />

        <strong className="idication-login">
          You have to Log In to access to your cart
        </strong>
        <br />

        <div className="tex-data-login">
          <strong className="tes-data">Test Data</strong>
          <i className="bx bx-envelope"> john@gmail.com</i>
          <i className="bx bx-key"> john1234</i>
        </div>
      </div>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>

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

export default Login;
