import { useParams } from "react-router-dom";
import { useFetch } from "use-http";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import Layout from "../components/Layout";
import CountryFlag from "react-country-flag";

const TournamentDetailPage = () => {
  const { tournamentId } = useParams();
  const { data: tournament, loading: tournamentLoading } = useFetch(
    `/tournaments/${tournamentId}`,
    []
  );
  const { data: players, loading: playersLoading } = useFetch(
    `/tournaments/${tournamentId}/participants`,
    []
  );

  return (
    <Layout>
      {(tournamentLoading || playersLoading) && <CircularProgress />}
      {tournament && (
        <Card variant="outlined">
          <CardContent style={{ textAlign: "center" }}>
            <CountryFlag
              style={{
                textAlign: "center",
                borderRadius: "50%",
                width: 100,
                height: 100,
              }}
              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
              countryCode={tournament.country}
              svg
            />
            <Typography align="center" variant="h4">
              {tournament.name}
            </Typography>
            <Typography align="center" variant="h5">
              {tournament.date_start}
            </Typography>
            <Typography align="center" variant="h6">
              {players && `${players.length}  players`}
            </Typography>
          </CardContent>
        </Card>
      )}
      {players && (
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full name</TableCell>
                <TableCell>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    {`${participant.player.last_name} ${participant.player.first_name}`}
                  </TableCell>
                  <TableCell>{participant.declared_rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </Layout>
  );
};

export default TournamentDetailPage;
