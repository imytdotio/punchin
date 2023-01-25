import React, { useContext, useEffect, useState } from "react";
import { H1, Button } from "./Components";
import { Todo } from "./Todo";
import { supabase } from "../supabaseClient";
import { AuthContext } from "../Hooks/AuthContext";
import { Punch } from "./Punch";

/**
 * @author
 * @function Punchin
 **/

export const Account = ({ session }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <H1>Hi, {user.email}</H1>
          <Punch />
          <Todo id={user.id} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
