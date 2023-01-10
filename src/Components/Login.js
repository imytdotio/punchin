import React from "react";
import { Button, ButtonOutline, Input, Form } from "./Components";

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
        <ButtonOutline style="outline" onClick={SignupHandler}>
          Sign up
        </ButtonOutline>
        <Button style="outline" onClick={LoginHandler}>
          Login
        </Button>
      </Form>
    </div>
  );
};
