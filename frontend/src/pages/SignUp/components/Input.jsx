import { FormControl, TextField } from "@mui/material";

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
        error={error}
        helperText={error}
        color={+error ? "error" : "primary"}
        onChange={onChange}
        type={type}
      />
    </FormControl>
  );
}
