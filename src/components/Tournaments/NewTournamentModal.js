import { useState, memo } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";

import { countryCodes } from "../../lib/country-codes";
import CountryFlag from "react-country-flag";

const NewTournamentModal = (props) => {
  const [tournamentData, setTournamentData] = useState({
    name: "",
    country: "",
    date_start: new Date(),
    date_end: new Date(),
  });

  const handleFieldUpdate = (key) => (event) => {
    setTournamentData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await props.onAddTournament({
      ...tournamentData,
      date_start: tournamentData.date_start.toISOString().split("T")[0],
      date_end: tournamentData.date_end.toISOString().split("T")[0],
    });
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>New Tournament</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DialogContent>
          <TextField
            variant="standard"
            required
            autoFocus
            fullWidth
            id="name"
            label="Name"
            value={tournamentData.name}
            onChange={handleFieldUpdate("name")}
          />
          <TextField
            variant="standard"
            id="country"
            select
            required
            fullWidth
            label="Country"
            value={tournamentData.country}
            onChange={handleFieldUpdate("country")}
          >
            {countryCodes.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                <CountryFlag countryCode={country.code} />
                <Typography>{country.label}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <DateRangePicker
            startText="Date Start"
            endText="Date End"
            onChange={([newDateStart, newDateEnd]) =>
              setTournamentData((prevData) => ({
                ...prevData,
                date_start: newDateStart,
                date_end: newDateEnd,
              }))
            }
            value={[tournamentData.date_start, tournamentData.date_end]}
            renderInput={(startProps, endProps) => (
              <>
                <TextField
                  id="date_start"
                  variant="standard"
                  required
                  {...startProps}
                />
                <TextField
                  id="date_end"
                  variant="standard"
                  required
                  {...endProps}
                />
              </>
            )}
          />
        </DialogContent>
      </LocalizationProvider>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={submitHandler}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(NewTournamentModal);
