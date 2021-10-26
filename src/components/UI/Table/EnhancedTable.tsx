import { ChangeEvent, Key, MouseEvent, useState } from "react";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { Column, Order } from "./enhanced-table";
import EnhancedTablePagination from "./EnhancedTablePagination";
import EnhancedTableRow from "./EnhancedTableRow";

type Props<Schema> = {
  rows: (Schema & { id: Key })[];
  makeRowData: (row: Schema) => any;
  title: string;
  columns: readonly Column[];
  defaultOrder: Order;
  defaultOrderBy: keyof Schema;
};

const EnhancedTable = <Schema,>(props: Props<Schema>) => {
  const { rows, makeRowData, title, columns, defaultOrder, defaultOrderBy } =
    props;

  const [selected, setSelected] = useState<Key[]>([]);
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = useState<keyof Schema>(defaultOrderBy);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const sortHandler = (
    event: MouseEvent<HTMLInputElement>,
    property: keyof Schema
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortCompareFn = (a: Schema, b: Schema): number => {
    if (a[orderBy] === b[orderBy]) {
      return 0;
    }
    if (
      (order === "asc" && b[orderBy] < a[orderBy]) ||
      (order === "desc" && a[orderBy] < b[orderBy])
    ) {
      return 1;
    }
    return -1;
  };

  const selectAllHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row: Schema & { id: Key }) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const rowClickHandler = (
    event: MouseEvent<HTMLTableRowElement>,
    clickedRowId: Key
  ) => {
    setSelected((prevSelected) => {
      if (prevSelected.indexOf(clickedRowId) === -1) {
        return [...prevSelected, clickedRowId];
      } else {
        return prevSelected.filter((rowId) => rowId !== clickedRowId);
      }
    });
  };

  const isRowSelected = (rowId: Key) => selected.indexOf(rowId) !== -1;

  const changePageHandler = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const changeRowsPerPageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <EnhancedTableToolbar title={title} numSelected={selected.length} />
      <TableContainer>
        <Table>
          <EnhancedTableHead
            columns={columns}
            numSelected={selected.length}
            onSort={sortHandler}
            onSelectAll={selectAllHandler}
            order={order}
            orderBy={orderBy}
            rowCount={rows.length}
          />
          <TableBody>
            {rows
              .sort(sortCompareFn)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <EnhancedTableRow
                  key={row.id}
                  rowId={row.id}
                  columns={columns}
                  row={makeRowData(row)}
                  onRowClick={rowClickHandler}
                  isSelected={isRowSelected(row.id)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EnhancedTablePagination
        rowCount={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={changePageHandler}
        onRowsPerPageChange={changeRowsPerPageHandler}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
    </Paper>
  );
};

export default EnhancedTable;
