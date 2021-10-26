import { ChangeEvent, MouseEvent } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { Column, Order } from "./enhanced-table";
import SelectAllCheckbox from "./SelectAllCheckBox";
import EnhancedHeadCell from "./EnhancedHeadCell";

type Props<Schema> = {
  columns: readonly Column[];
  numSelected: number;
  onSort: (event: MouseEvent<HTMLInputElement>, property: keyof Schema) => void;
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof Schema;
  rowCount: number;
};

const EnhancedTableHead = <Schema,>(props: Props<Schema>) => {
  const {
    columns,
    onSelectAll,
    order,
    orderBy,
    numSelected,
    rowCount,
    onSort,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {onSelectAll && (
          <TableCell padding="checkbox">
            <SelectAllCheckbox
              numSelected={numSelected}
              rowCount={rowCount}
              onSelectAll={onSelectAll}
            />
          </TableCell>
        )}
        {columns.map((column) => (
          <EnhancedHeadCell
            key={column.id}
            column={column}
            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
