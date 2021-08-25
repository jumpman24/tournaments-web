import { useCallback, useEffect, useState } from "react";
import { useFetch } from "use-http";

import { Button, Fab, styled } from "@mui/material";
import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

import TournamentsTable from "../components/Tournaments/TournamentsTable";
import NewTournamentModal from "../components/Tournaments/NewTournamentModal";
import Layout from "../components/Layout";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
}));

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const { get, post, response, del } = useFetch("/tournaments");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadTournaments = async () => {
      const loadedTournaments = await get();

      if (response.ok) {
        setTournaments(loadedTournaments);
      } else {
        console.log(response);
        console.log("Failed to get tournaments list!");
      }
    };

    loadTournaments().then();
  }, [get, response]);

  const addTournamentHandler = useCallback(
    async (tournamentData) => {
      console.log(tournamentData);
      const newTournament = await post(tournamentData);

      if (response.ok) {
        setTournaments((prevTournaments) => [
          ...prevTournaments,
          newTournament,
        ]);
      } else {
        console.log("Failed to create new tournament!");
      }
    },
    [post, response]
  );

  const deleteTournamentHandler = useCallback(
    (tournamentId) => async () => {
      await del(`/${tournamentId}`);
      if (response.ok) {
        setTournaments((prevTournaments) =>
          prevTournaments.filter((tournament) => tournament.id !== tournamentId)
        );
      } else {
        console.log("Failed to delete tournament!");
      }
    },
    [del, response]
  );

  const showModal = useCallback(() => setModalOpen(true), []);
  const hideModal = useCallback(() => setModalOpen(false), []);

  const appBarButton = (
    <>
      <div style={{ flexGrow: 1 }} />
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<PersonAddIcon />}
        onClick={showModal}
      >
        New Tournament
      </Button>
    </>
  );
  return (
    <Layout appBar={appBarButton}>
      <NewTournamentModal
        open={modalOpen}
        onClose={hideModal}
        onAddTournament={addTournamentHandler}
      />
      <TournamentsTable
        tournaments={tournaments}
        onDeleteTournament={deleteTournamentHandler}
      />
      <StyledFab color="secondary" aria-label="add" onClick={showModal}>
        <AddIcon />
      </StyledFab>
    </Layout>
  );
};

export default TournamentsPage;
