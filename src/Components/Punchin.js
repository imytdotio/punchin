import React from "react";
import { H1, Task, Button } from "./Components";
import { Todo } from "./Todo";

/**
 * @author
 * @function Punchin
 **/

export const Punchin = (props) => {
  const name = "Nordac";
  const role = "Designer Intern";

  return (
    <div>
      <H1>Hi, {name}</H1>
      <p>Role: {role}</p>
      <Button>Check in</Button>
      <Button>Check out</Button>
      <Todo user={name} />
    </div>
  );
};
