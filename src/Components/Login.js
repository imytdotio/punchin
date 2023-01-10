import React from "react";
import { Button, Input, Form } from "./Components";

/**
 * @author
 * @function Login
 **/

export const Login = (props) => {
  const LoginHandler = (e) => {
    e.preventDefault();
  };
  const SignupHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Form onSubmit={LoginHandler}>
        <label>
          email: <Input type="email" />
        </label>
        <br />
        <label>
          password: <Input type="password" />
        </label>
        <br />
        <Button onClick={LoginHandler}>Login</Button>
        <Button onClick={SignupHandler}>Signup</Button>
      </Form>
    </div>
  );
};
