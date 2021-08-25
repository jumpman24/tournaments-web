import { useState, memo } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";

import { countryCodes } from "../../lib/country-codes";
import CountryFlag from "react-country-flag";

const ratingToRank = (rating) => {
  if (rating < 100) {
    return `${30 - Math.floor(rating / 10)}k`;
  }

  if (rating < 2100) {
    return `${21 - Math.floor(rating / 100)}k`;
  }

  if (rating < 2700) {
    return `${Math.floor(rating / 100) - 20}d`;
  }

  return `${Math.floor((rating - 2700) / 30) + 1}p`;
};

const NewPlayerModal = (props) => {
  const [playerData, setPlayerData] = useState({
    last_name: "",
    first_name: "",
    country: "",
    rating: "",
  });

  const handleFieldUpdate = (key) => (event) => {
    setPlayerData((prevState) => ({ ...prevState, [key]: event.target.value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await props.onAddPlayer(playerData);
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>New Player</DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          required
          autoFocus
          fullWidth
          id="last-name"
          label="Last name"
          value={playerData.last_name}
          onChange={handleFieldUpdate("last_name")}
        />
        <TextField
          variant="standard"
          required
          fullWidth
          id="first-name"
          label="First name"
          value={playerData.first_name}
          onChange={handleFieldUpdate("first_name")}
        />
        <TextField
          variant="standard"
          id="country"
          select
          required
          fullWidth
          label="Country"
          value={playerData.country}
          onChange={handleFieldUpdate("country")}
        >
          {countryCodes.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              <CountryFlag countryCode={country.code} />
              <Typography>{country.label}</Typography>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="standard"
          id="rating"
          required
          fullWidth
          label="Rating"
          value={playerData.rating}
          onChange={handleFieldUpdate("rating")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {ratingToRank(playerData.rating)}
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={submitHandler}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(NewPlayerModal);
