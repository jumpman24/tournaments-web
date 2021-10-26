import { ChangeEvent } from "react";
import { Checkbox } from "@mui/material";

type Props = {
  numSelected: number;
  rowCount: number;
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
};

const SelectAllCheckbox = (props: Props) => {
  const { numSelected, rowCount, onSelectAll, ariaLabel } = props;
  return (
    <Checkbox
      color="primary"
      indeterminate={numSelected > 0 && numSelected < rowCount}
      checked={rowCount > 0 && numSelected === rowCount}
      onChange={onSelectAll}
      inputProps={{ "aria-label": ariaLabel || "Select all" }}
    />
  );
};

export default SelectAllCheckbox;
