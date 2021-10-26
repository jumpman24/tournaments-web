import { useFetch } from "use-http";
import { FormEvent, useContext, useEffect } from "react";
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
import { AuthContext } from "../store/auth-context";
import LinkRouter from "../components/UI/LinkRouter";

const SignUpPage = () => {
  const { login } = useContext(AuthContext);
  const { post: postSignUp, loading, data, response } = useFetch("/sign-up");

  useEffect(() => {
    if (response.ok) {
      console.log(data);
      login(data.access_token, false);
    }
  }, [login, response, data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const requestData = {
      username: data.get("username"),
      full_name: data.get("name"),
      password: data.get("password"),
    };

    postSignUp(requestData).then();
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
        <Avatar sx={{ backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LinkRouter to="/sign-in" variant="body2">
                Already have an account? Sign in
              </LinkRouter>
            </Grid>
          </Grid>
        </Box>
        {loading && <CircularProgress />}
      </Box>
    </Container>
  );
};
export default SignUpPage;
