import { MouseEvent } from "react";
import {
  Toolbar,
  Theme,
  IconButton,
  alpha,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

type TooltipProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const DeleteTooltip = ({ onClick }: TooltipProps) => (
  <Tooltip title="Delete">
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
);
const FilterListTooltip = ({ onClick }: TooltipProps) => (
  <Tooltip title="Filter list">
    <IconButton onClick={onClick}>
      <FilterListIcon />
    </IconButton>
  </Tooltip>
);

type EnhancedTableToolbarProps = {
  title: string;
  numSelected: number;
  onRequestDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  onRequestFilter?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { title, numSelected, onRequestDelete, onRequestFilter } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          backgroundColor: (theme: Theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0
        ? onRequestDelete && <DeleteTooltip onClick={onRequestDelete} />
        : onRequestFilter && <FilterListTooltip onClick={onRequestFilter} />}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
