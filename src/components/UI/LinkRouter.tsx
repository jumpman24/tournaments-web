import React, { forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { Link, LinkProps } from "@mui/material";

type Props = RouterLinkProps & LinkProps;

const LinkRouter = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Link ref={ref} underline="hover" component={RouterLink} {...props}>
    {props.children}
  </Link>
));

export default LinkRouter;
