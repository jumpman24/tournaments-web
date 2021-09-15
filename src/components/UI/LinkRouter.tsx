import React, { PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

type Props = { to: string };

const LinkRouter = (props: PropsWithChildren<Props>) => (
  <Link underline="hover" component={RouterLink} {...props} />
);

export default LinkRouter;
