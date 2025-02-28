import { TextField } from "@mui/material";
// import PropTypes from "prop-types";

// Input.propTypes = {
//   id: PropTypes.string,
//   label: PropTypes.string,
//   error: PropTypes.string,
//   onChange: PropTypes.func,
//   type: PropTypes.string
// }

export function Input(props) {
  const { id, label, error, onChange, type, defaultValue, autoComplete = "off", value, name } = props;

  return (
    // <FormControl>
      <TextField
        label={label}
        // required
        fullWidth
        id={id}
        name={name}
        // autoComplete={autoComplete}
        variant="outlined"
        error={error ? true : false}
        helperText={error}
        color={+error ? "error" : "primary"}
        onChange={onChange}
        type={type}
        value={value}
        defaultValue={defaultValue}
      />
    // </FormControl>
  );
}
