import { MouseEvent } from "react";
import { TableCell, TableSortLabel } from "@mui/material";
import { Column, Order } from "./enhanced-table";

type Props<Schema> = {
  column: Column;
  order: Order;
  orderBy: keyof Schema;
  onSort: (event: MouseEvent<HTMLInputElement>, property: keyof Schema) => void;
};

const EnhancedHeadCell = <Schema,>(props: Props<Schema>) => {
  const { column, order, orderBy, onSort } = props;
  const createSortHandler =
    (property: keyof Schema) => (event: MouseEvent<HTMLInputElement>) => {
      onSort(event, property);
    };

  return (
    <TableCell
      key={column.id}
      align={column.numeric ? "right" : "left"}
      padding={column.disablePadding ? "none" : "normal"}
      sortDirection={orderBy === column.id && order}
    >
      <TableSortLabel
        active={orderBy === column.id}
        direction={orderBy === column.id ? order : "asc"}
        onClick={createSortHandler(column.id)}
      >
        {column.label}
      </TableSortLabel>
    </TableCell>
  );
};

export default EnhancedHeadCell;
