import { FormControl, TextField } from "@mui/material";
// import PropTypes from "prop-types";

// Input.propTypes = {
//   id: PropTypes.string,
//   label: PropTypes.string,
//   error: PropTypes.string,
//   onChange: PropTypes.func,
//   type: PropTypes.string
// }

export function Input(props) {
  const { id, label, error, onChange, type } = props;

  return (
    <FormControl>
      <TextField
        label={label}
        // required
        fullWidth
        id={id}
        name={id}
        autoComplete={id}
        variant="outlined"
        error={error ? true : false}
        helperText={error}
        color={+error ? "error" : "primary"}
        onChange={onChange}
        type={type}
      />
    </FormControl>
  );
}
