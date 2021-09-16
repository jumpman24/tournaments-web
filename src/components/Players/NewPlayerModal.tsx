import { ChangeEvent, MouseEvent, useState, memo } from "react";
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
// @ts-ignore
import CountryFlag from "react-country-flag";

import { countryCodes } from "../../lib/country-codes";
import { ratingToRank } from "../../lib/rating";

type InputData = {
  last_name: string;
  first_name: string;
  country: string;
  rating: string;
};

type Props = {
  onAddPlayer: (playerData: InputData) => Promise<void>;
  open: boolean;
  onClose: () => void;
};

const NewPlayerModal = (props: Props) => {
  const [playerData, setPlayerData] = useState<InputData>({
    last_name: "",
    first_name: "",
    country: "",
    rating: "",
  });

  const handleFieldUpdate =
    (key: keyof InputData) => (event: ChangeEvent<HTMLInputElement>) => {
      setPlayerData((prevState) => ({
        ...prevState,
        [key]: event.target.value,
      }));
    };

  const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
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
                {ratingToRank(parseInt(playerData.rating))}
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
