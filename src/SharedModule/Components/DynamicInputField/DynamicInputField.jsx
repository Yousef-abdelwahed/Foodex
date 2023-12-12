/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputAdornment, TextField } from "@mui/material";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";

const DynamicInputField = ({
  register,
  type,
  placeholder,
  inputType,
  children,
}) => {
  return (
    <div className="my-2">
      <TextField
        size="small"
        placeholder={placeholder}
        type={inputType}
        required={true}
        {...register(type, {
          required: true,
          pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          min: 6,
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span className=" me-2">
                {/* <FontAwesomeIcon icon={faMobileScreenButton} /> */}
                {children ? (
                  children
                ) : (
                  <FontAwesomeIcon icon={faMobileScreenButton} />
                )}
                <span className="input-icon ms-2"></span>
              </span>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </div>
  );
};

export default DynamicInputField;
