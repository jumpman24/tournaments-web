import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "use-http";

import ChatPage from "./pages/ChatPage";
import KifuPage from "./pages/KifuPage";
import PlayersPage from "./pages/PlayersPage";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentPage from "./pages/TournamentDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthContextProvider from "./store/auth-context";

const API_PUBLIC_URL =
  process.env.REACT_APP_API_PUBLIC_URL || "http://localhost:8000/api/v1";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const options = { cachePolicy: "no-cache" };
  if (accessToken) {
    options.headers = { Authorization: `Bearer ${accessToken}` };
  }

  return (
    <AuthContextProvider token={accessToken} setToken={setAccessToken}>
      <Provider url={API_PUBLIC_URL} options={options}>
        <BrowserRouter>
          <CssBaseline />
          <Switch>
            <Route path="/chat" component={ChatPage} />
            <Route path="/kifu" component={KifuPage} />
            <Route path="/players" component={PlayersPage} />
            <Route
              path="/tournaments/:tournamentId"
              component={TournamentPage}
            />
            <Route path="/tournaments" component={TournamentsPage} />
            <Route path="/sign-up" component={SignUpPage} exact />
            <Route path="/sign-in" component={SignInPage} exact />
            <Route path="/" component={SignUpPage} exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    </AuthContextProvider>
  );
};

export default App;
