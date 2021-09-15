import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "use-http";

import PlayersPage from "./pages/PlayersPage";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentPage from "./pages/TournamentDetailsPage";

const API_PUBLIC_URL =
  process.env.REACT_APP_API_PUBLIC_URL || "http://localhost:8000/api/v1";

const App = () => {
  return (
    <Provider url={API_PUBLIC_URL}>
      <BrowserRouter>
        <CssBaseline />
        <Switch>
          <Route path="/players" component={PlayersPage} />
          <Route path="/tournaments/:tournamentId" component={TournamentPage} />
          <Route path="/tournaments" component={TournamentsPage} />
          <Route path="/" component={PlayersPage} exact />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
