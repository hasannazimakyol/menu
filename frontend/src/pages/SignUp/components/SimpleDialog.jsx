import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function SimpleDialog(props) {
  const { onClose, allSelected, open } = props;

  const [term, setTerm] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [term3, setTerm3] = useState(false);

  const handleClose = () => {
    if (term && term2 && term3) {
      onClose(true);
    } else {
      onClose(false);
    }
  };

  useEffect(() => {
    setTerm(allSelected);
    setTerm2(allSelected);
    setTerm3(allSelected);
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle textAlign="center">Agree our terms</DialogTitle>
      <TextField
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
        }}
        value={`There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injectedhumour, or non-characteristic words etc`}
        disabled
        multiline
        rows={10}
        variant="outlined"
        fullWidth
      ></TextField>
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={term}
                onChange={(event) => setTerm(event.target.checked)}
              />
            }
            label="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={term2}
                onChange={(event) => setTerm2(event.target.checked)}
              />
            }
            label="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={term3}
                onChange={(event) => setTerm3(event.target.checked)}
              />
            }
            label="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
          />
        </Box>
      </Box>
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose}
            disabled={!term || !term2 || !term3}
            sx={{ borderRadius: 10, height: 30, mx: 1 }}
          >
            OK
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="anger"
            onClick={() => onClose(false)}
            sx={{ borderRadius: 10, height: 30, mx: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
};
