/** @format */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useForm } from "react-hook-form";

import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
const PasswordInput = ({ password, validation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <Box sx={{ "& > :not(style)": { m: 1 } }}>
    <TextField
      size="small"
      type={showPassword ? "text" : "password"}
      // label="Password"
      placeholder="Password"
      // onChange={handlePassword}
      required={true}
      validation={validation}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <span className=" me-2">
              <HttpsOutlinedIcon fontSize="small" color="action" />
              <span className="input-icon ms-2"></span>
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
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default PasswordInput;
