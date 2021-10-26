import { List, ListItem } from "@mui/material";

type User = {
  id: number;
  username: string;
  full_name: string;
};

type Props = {
  users: User[];
};
const UsersList = ({ users }: Props) => {
  return (
    <List>
      {!users.length && "No users online!"}
      {users
        .filter(
          (user, index) =>
            users.findIndex((user2) => user2.id === user.id) === index
        )
        .map((user) => (
          <ListItem key={user.id}>
            {user.username} ({user.full_name})
          </ListItem>
        ))}
    </List>
  );
};
export default UsersList;
