import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Grid } from "@mui/material";
import UsersList from "../components/Users/UsersList";

type WebSocketMessage = {
  action: string;
  payload: any;
};

const ChatPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [, setMessages] = useState<any[]>([]);

  const webSocket = useWebSocket("ws://localhost:8000/websocket");
  const lastMessage: WebSocketMessage = webSocket.lastJsonMessage;

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    if (lastMessage.action === "chat.add") {
      setMessages((prevState) => [...prevState, lastMessage.payload]);
    }
    if (lastMessage.action === "users.add") {
      setUsers((prevState) => [...prevState, lastMessage.payload]);
    }

    if (lastMessage.action === "users.remove") {
      setUsers((prevState) => {
        const newState = [...prevState];
        const lastIndex = newState.findIndex(
          (user) => user.id === lastMessage.payload.id
        );
        console.log(newState);
        console.log(lastIndex);
        if (lastIndex !== -1) {
          newState.splice(lastIndex, 1);
        }
        return newState;
      });
    }
  }, [lastMessage]);

  return (
    <Grid container columns={12}>
      <Grid item xs={12}>
        Header
      </Grid>
      <Grid item xs={2}>
        Room List
      </Grid>
      <Grid item xs={7}>
        Chat View
      </Grid>
      <Grid item xs={3}>
        <UsersList users={users} />
      </Grid>
      <Grid item xs={12}>
        Footer
      </Grid>
    </Grid>
  );
};
export default ChatPage;
