import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button, ButtonOutline, Form, H1, Input } from "./Components";
/**
 * @author
 * @function Todo
 **/

const TodoBlock = (props) => {
  return (
    <li className="flex gap-2 m-1 px-2 py-1">
      {props.isCompleted ? (
        <p className="cursor-pointer" onClick={() => props.onCheck(props.id)}>
          ☑️
        </p>
      ) : (
        <p className="cursor-pointer" onClick={() => props.onCheck(props.id)}>
          👀
        </p>
      )}
      <p className="flex-1">{props.name}</p>
      <p>✏️</p>
      <p
        className="cursor-pointer"
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        🗑
      </p>
    </li>
  );
};

export const Todo = (props) => {
  // Get Todos
  const [todos, setTodos] = useState(null);
  const [error, setError] = useState(null);

  const getTodos = async () => {
    const { data, error } = await supabase.from("todos").select();
    if (error) {
      setError(error.message);
      console.log(error);
    }
    if (data) {
      setTodos(data);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Add Todos
  const [title, setNewTodo] = useState("");
  const addTodo = async (e) => {
    e.preventDefault();

    if (title.length < 1) {
      return;
    }

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title }])
      .select();

    if (error) {
      setError(error.message);
      console.log(error);
    }

    if (data) {
      setError(null);
      getTodos();
    }
  };

  const checkHandler = async (todo) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ isCompleted: !todo.isCompleted })
      .eq("id", todo.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      getTodos();
    }
  };

  const deleteHandler = async (todo) => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", todo.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      getTodos();
    }
  };

  return (
    <ul className="w-fit m-auto p-4 text-left">
      <H1>Todos</H1>
      {error && <p>{error}</p>}
      <Form>
        <Input onChange={(e) => setNewTodo(e.target.value)} />
        <ButtonOutline onClick={addTodo}>Add</ButtonOutline>
      </Form>
      {todos && (
        <React.Fragment>
          {todos.map((todo) => {
            return (
              <TodoBlock
                name={todo.title}
                isCompleted={todo.isCompleted}
                key={todo.id}
                onCheck={() => checkHandler(todo)}
                onDelete={() => deleteHandler(todo)}
              />
            );
          })}
        </React.Fragment>
      )}
      {/* {tasks.map((task) => {
        return (
          <TodoBlock
            key={task.name}
            name={task.name}
            isCompleted={task.isCompleted}
          />
        );
      })} */}
    </ul>
  );
};
