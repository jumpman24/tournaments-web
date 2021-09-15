import { Component, PropsWithChildren, useCallback, useState } from "react";
import { AppBar, Grid, IconButton, Toolbar, styled } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import NavigationDrawer from "./UI/NavigationDrawer";

const Cusion = styled("div")(({ theme }) => theme.mixins.toolbar);

type Props = {
  appBar: Component;
};
const Layout = (props: PropsWithChildren<Props>) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => setDrawerOpen(true), []);
  const handleDrawerClose = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <NavigationDrawer open={drawerOpen} onClose={handleDrawerClose} />

      <Grid container>
        <Grid item xs={12}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                onClick={handleDrawerOpen}
                edge="start"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {props.appBar}
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <Cusion />
          <main>{props.children}</main>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
