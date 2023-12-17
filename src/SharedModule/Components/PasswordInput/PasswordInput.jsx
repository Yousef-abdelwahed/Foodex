/** @format */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";

const PasswordInput = ({ register, placeholder, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-2">
      <TextField
        size="small"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required={true}
        {...register(value, {
          required: true,
          min: 6,
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span className=" me-1">
                <HttpsOutlinedIcon fontSize="small" color="action" />
                <span className="input-icon ms-1"></span>
              </span>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </div>
  );
};

export default PasswordInput;
