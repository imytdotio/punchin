import React from "react";

/**
 * @author
 * @function Component
 **/

export const H1 = (props) => {
  return <h1 className="font-bold">{props.children}</h1>;
};

export const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="mx-auto w-fit">
      {props.children}
    </form>
  );
};

export const Input = (props) => {
  return (
    <input
      className="inline-block my-1 text-left"
      type={props.type}
      onChange={props.onChange}
      onBlur={props.onBlur}
    >
      {props.children}
    </input>
  );
};

export const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-blue-600 inline-block m-2 text-white py-2 px-6 rounded-xl"
    >
      {props.children}
    </button>
  );
};

export const Task = (props) => {
  return (
    <div className="flex gap-2">
      {props.isCompleted ? <p>☑️</p> : <p>👀</p>}
      <p>{props.name}</p>
    </div>
  );
};
