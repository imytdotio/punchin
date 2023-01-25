import React, { createContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log(error);
      console.log(error.message);
      setError(error);
    }

    if (data) {
      console.log(data);
      setError(null);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data) {
      console.log(data);
      setUser(data);
      setError(null);
      setIsAuthenticated(true);
    }
    if (error) {
      console.log(error.message);
      setError(error);
      setIsAuthenticated(false);
      return;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
