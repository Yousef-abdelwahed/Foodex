/** @format */

import React from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const TostContext = createContext(null);

const ToastContextProvider = (props) => {
  const getToastValue = (type, message) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <TostContext.Provider value={{ getToastValue }}>
      {props.children}
    </TostContext.Provider>
  );
};

export default ToastContextProvider;
