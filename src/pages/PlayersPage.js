import { useCallback, useEffect, useState } from "react";
import { useFetch } from "use-http";

import { Button, Fab, styled } from "@mui/material";
import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

import PlayersTable from "../components/Players/PlayersTable";
import NewPlayerModal from "../components/Players/NewPlayerModal";
import Layout from "../components/Layout";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
}));

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const { get, post, response, del } = useFetch("/players");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadPlayers = async () => {
      const loadedPlayers = await get();

      if (response.ok) {
        setPlayers(loadedPlayers);
      } else {
        console.log(response);
        console.log("Failed to get players list!");
      }
    };

    loadPlayers().then();
  }, [get, response]);

  const addPlayerHandler = useCallback(
    async (playerData) => {
      const newPlayer = await post(playerData);

      if (response.ok) {
        setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      } else {
        console.log("Failed to create new player!");
      }
    },
    [post, response]
  );

  const deletePlayerHandler = useCallback(
    (playerId) => async () => {
      await del(`/${playerId}`);
      if (response.ok) {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player.id !== playerId)
        );
      } else {
        console.log("Failed to delete player!");
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
        New Player
      </Button>
    </>
  );
  return (
    <Layout appBar={appBarButton}>
      <NewPlayerModal
        open={modalOpen}
        onClose={hideModal}
        onAddPlayer={addPlayerHandler}
      />
      <PlayersTable players={players} onDeletePlayer={deletePlayerHandler} />
      <StyledFab color="secondary" aria-label="add" onClick={showModal}>
        <AddIcon />
      </StyledFab>
    </Layout>
  );
};

export default PlayersPage;
