/** @format */

import React from "react";
const Context = (props) => {
  let getToastValue =(type,message)=>{
    return toast[type](message,{
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }
  return <div>Context</div>;
};

export default Context;
