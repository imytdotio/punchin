import React, { useContext, useState } from "react";
import { Button, ButtonOutline, Input, Form } from "./Components";

import { AuthContext } from "../Hooks/AuthContext";

/**
 * @author
 * @function Login
 **/

export const Auth = (props) => {
  const { user, isAuthenticated, signUp, signIn, signOut, error } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <ButtonOutline
          style="outline"
          onClick={(e) => {
            e.preventDefault();
            signUp(email, password);
          }}
        >
          Sign up
        </ButtonOutline>
        {isAuthenticated ? (
          <Button
            style="outline"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            style="outline"
            onClick={(e) => {
              e.preventDefault();
              signIn(email, password);
            }}
          >
            Login
          </Button>
        )}
        {error ? <p className="text-red-600">{error.message}</p> : ""}
      </Form>
    </div>
  );
};

// Legacy

// const SignupHandler = async (e) => {
//   e.preventDefault();
// const { data, error } = await supabase.auth.signUp({
//   email,
//   password,
// });

// if (error) {
//   console.log(error);
//   console.log(error.message);
//   setError(error);
// }

// if (data) {
//   console.log(data);
//   setError(null);
// }
// };

// const LoginHandler = async (e) => {
//   e.preventDefault();
// const { data, error } = await supabase.auth.signInWithPassword({
//   email,
//   password,
// });
// if (data) {
//   console.log(data);
//   setUser(data);
//   setError(null);
// }
// if (error) {
//   console.log(error.message);
//   setError(error);
// }
// };

// const LogoutHandler = async (e) => {
//   e.preventDefault();
// const { error } = await supabase.auth.signOut();
// // if (data) {
// //   console.log(data);
// //   console.log("logged out");
// //   setUser(null);
// // }
// setUser(null);
// if (error) {
//   console.log(error);
// }
// };
