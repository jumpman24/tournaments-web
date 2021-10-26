import { Key, MouseEvent } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { Column } from "./enhanced-table";

type Props = {
  rowId: Key;
  row: any;
  columns: readonly Column[];
  isSelected: boolean;
  onRowClick: (event: MouseEvent<HTMLTableRowElement>, rowId: Key) => void;
};

const EnhancedTableRow = (props: Props) => {
  const { rowId, row, columns, onRowClick, isSelected } = props;

  return (
    <TableRow
      hover
      onClick={(event: MouseEvent<HTMLTableRowElement>) =>
        onRowClick(event, rowId)
      }
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      key={rowId}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isSelected}
          inputProps={{
            "aria-labelledby": `checkbox-${rowId}`,
          }}
        />
      </TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={column.numeric ? "right" : "left"}
          padding={column.disablePadding ? "none" : "normal"}
        >
          {row[column.id]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default EnhancedTableRow;
