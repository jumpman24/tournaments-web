import { Drawer, List, ListItem, ListItemText, styled } from "@mui/material";
import LinkRouter from "./LinkRouter";

const links = [
  { ref: "/", label: "Home" },
  { ref: "/players", label: "Players" },
  { ref: "/tournaments", label: "Tournaments" },
];

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": { width: drawerWidth },
}));

type Props = {
  open: boolean;
  onClose: () => void;
};

const NavigationDrawer = (props: Props) => {
  return (
    <StyledDrawer
      open={props.open}
      onClose={props.onClose}
      ModalProps={{ keepMounted: true }}
    >
      <List onClick={props.onClose}>
        {links.map((link) => (
          <ListItem key={link.ref} button component={LinkRouter} to={link.ref}>
            <ListItemText>{link.label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default NavigationDrawer;
