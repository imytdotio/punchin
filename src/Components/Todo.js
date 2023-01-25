import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button, ButtonOutline, Form, H1, Input } from "./Components";
/**
 * @author
 * @function Todo
 **/

const TodoBlock = (props) => {
  return (
    <li className="flex gap-2 m-1 py-1 w-full">
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
    const { data, error } = await supabase
      .from("todos")
      .select()
      .eq("uid", props.id);
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
      .insert([{ title, uid: props.id }])
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
        <ButtonOutline
          onClick={addTodo}
          className="w-full hover:bg-blue-600 hover:text-white"
        >
          Add
        </ButtonOutline>
      </Form>
      {todos && (
        <>
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
        </>
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
