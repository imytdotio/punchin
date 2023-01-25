import React, { useEffect, useState } from "react";
import { H1, Button } from "./Components";
import { Todo } from "./Todo";
import { supabase } from "../supabaseClient";

/**
 * @author
 * @function Punchin
 **/

export const Account = ({ session }) => {
  // const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("Nordac");
  const [role, setRole] = useState("Designer Intern");

  

  return (
    <div>
      <H1>Hi, {username}</H1>
      <p>Role: {role}</p>
      <Button>Check in</Button>
      <Button>Check out</Button>
      <Todo/>
    </div>
  );
};
