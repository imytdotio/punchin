import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Hooks/AuthContext";
import { Button } from "./Components";
import { supabase } from "../supabaseClient";

/**
 * @author
 * @function Punch
 **/

export const Punch = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [punchInTime, setpunchInTime] = useState(null);
  const [punchOutTime, setpunchOutTime] = useState(null);

  const getPunchedTime = async () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const { data, error } = await supabase
      .from("PunchLog")
      .select()
      .eq("uid", user.id)
      .eq("date", date);

    if (data) {
      setpunchInTime(data[0].punchIn);
      setpunchOutTime(data[0].punchOut);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPunchedTime();
  }, []);

  const punchInHandler = async (e) => {
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
      .from("PunchLog")
      .insert({ uid: user.id, date, punchIn: time })
      .select();
    if (data) {
      //   console.log(data);
      getPunchedTime();
    }

    if (error) {
      console.log(error);
    }
  };

  const punchOutHandler = async (e) => {
    e.preventDefault();

    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const { data, error } = await supabase
      .from("PunchLog")
      .update({ punchOut: time })
      .eq("uid", user.id)
      .eq("date", date)
      .select();

    if (data) {
      //   console.log(data);
      getPunchedTime();
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Button
            onClick={punchInHandler}
            disabled={punchInTime ? true : false}
            className={
              punchInTime
                ? "bg-gray-200 text-black hover:bg-gray-200 hover:text-black hover:shadow-none cursor-not-allowed"
                : ""
            }
          >
            {punchInTime ? "Punched in" : "Punch in"}
          </Button>
          <Button
            onClick={punchOutHandler}
            disabled={punchOutTime ? true : false}
            className={
              punchOutTime
                ? "bg-gray-200 text-black hover:bg-gray-200 hover:text-black hover:shadow-none cursor-not-allowed"
                : ""
            }
          >
            {punchOutTime ? "Punched out" : "Punch out"}
          </Button>
          {punchInTime && <p>Punched In: {punchInTime}</p>}
          {punchOutTime && <p>Punched Out: {punchOutTime}</p>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
