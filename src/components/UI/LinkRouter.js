import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { forwardRef } from "react";

const LinkRouter = forwardRef((props, ref) => (
  <Link ref={ref} underline="hover" component={RouterLink} {...props} />
));

export default LinkRouter;
