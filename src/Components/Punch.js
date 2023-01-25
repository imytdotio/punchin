import React, { useContext } from "react";
import { AuthContext } from "../Hooks/AuthContext";
import { Button } from "./Components";
import { supabase } from "../supabaseClient";

/**
 * @author
 * @function Punch
 **/

export const Punch = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const checkInHandler = async (e) => {
    e.preventDefault();
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    // For International Users
    // const time = `${today.getUTCHours()}:${today.getUTCMinutes()}:${today.getUTCSeconds()}`;
    // For Local Users
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const { data, error } = await supabase
      .from("Checkin")
      .insert({ uid: user.id, date, checkin: time })
      .select();
    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  const checkOutHandler = async (e) => {
    e.preventDefault();

    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const { data, error } = await supabase
      .from("Checkin")
      .update({ checkout: time })
      .eq("uid", user.id)
      .eq("date", date)
      .select();

    if (data) {
      console.log(data[0].checkin);
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Button onClick={checkInHandler}>Check in</Button>
          <Button onClick={checkOutHandler}>Check out</Button>
        </div>
      ) : (
        <div>No</div>
      )}
    </>
  );
};
