import { FormEvent, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinkRouter from "../components/UI/LinkRouter";
import { useFetch } from "use-http";
import { AuthContext } from "../store/auth-context";

const SignInPage = () => {
  const { login } = useContext(AuthContext);
  const [remember, setRemember] = useState(false);
  const { post: postSignIn, loading, data, response } = useFetch("/sign-in");

  useEffect(() => {
    if (response.ok) {
      console.log(data);
      login(data.access_token, remember);
    }
  }, [remember, login, response, data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(data);
    setRemember(true);
    postSignIn(data).then();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <LinkRouter to="/sign-up" variant="body2">
                Don't have an account? Sign Up
              </LinkRouter>
            </Grid>
          </Grid>
        </Box>
        {loading && <CircularProgress />}
      </Box>
    </Container>
  );
};
export default SignInPage;
