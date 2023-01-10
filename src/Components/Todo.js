import React from "react";
/**
 * @author
 * @function Todo
 **/

const Task = (props) => {
  return (
    <li className="flex gap-2 m-1 px-2 py-1">
      {props.isCompleted ? <p>☑️</p> : <p>👀</p>}
      <p>{props.name}</p>
    </li>
  );
};

const tasks = [
  { name: "login", isCompleted: false },
  { name: "signup", isCompleted: false },
  { name: "check in", isCompleted: false },
  { name: "check out", isCompleted: false },
  { name: "to do list", isCompleted: false },
  { name: "role system", isCompleted: false },
];

export const Todo = (props) => {
  return (
    <ul className="w-fit m-auto p-4 text-left">
      <h1>Todos:</h1>
      {tasks.map((task) => {
        return (
          <Task
            key={task.name}
            name={task.name}
            isCompleted={task.isCompleted}
          ></Task>
        );
      })}
    </ul>
  );
};
