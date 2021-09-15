import { ChangeEvent, MouseEvent, PropsWithChildren, useState } from "react";
// @ts-ignore
import CountryFlag from "react-country-flag";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import LinkRouter from "../UI/LinkRouter";
import { countryCodes } from "../../lib/country-codes";
import { visuallyHidden } from "@mui/utils";

interface PlayerData {
  id: number;
  country: string;
  last_name: string;
  first_name: string;
  rating: number;
}

interface Column {
  id: keyof PlayerData;
  label: string;
}

const columns: readonly Column[] = [
  { id: "country", label: "Country" },
  { id: "last_name", label: "Last name" },
  { id: "first_name", label: "First name" },
  { id: "rating", label: "Rating" },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

const getComparator = (order: Order, orderBy: string) => {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

interface TableHeadProps {
  order: Order;
  orderBy: string;
  onSort: (event: MouseEvent<unknown>, property: keyof PlayerData) => void;
}
const SortableTableHead = (props: PropsWithChildren<TableHeadProps>) => {
  const { order, orderBy, onSort } = props;

  const createSortHandler =
    (property: keyof PlayerData) => (event: MouseEvent<unknown>) => {
      onSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const makePlayerData = (data: PlayerData) => ({
  id: data.id,
  country: (
    <CountryFlag
      svg
      countryCode={data.country}
      title={countryCodes.find((item) => item.code === data.country)?.label}
      style={{ height: "2rem", width: "2rem" }}
    />
  ),
  last_name: (
    <LinkRouter to={`/players/${data.id}`}>{data.last_name}</LinkRouter>
  ),
  first_name: (
    <LinkRouter to={`/players/${data.id}`}>{data.first_name}</LinkRouter>
  ),
  rating: <Typography>{data.rating}</Typography>,
});

type Props = {
  players: PlayerData[];
};
const PlayersTable = (props: Props) => {
  const { players } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof PlayerData>("rating");

  const sortHandler = (
    event: MouseEvent<unknown>,
    property: keyof PlayerData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const changePageHandler = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);
  const changeRowsPerPageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ margin: "2rem" }} elevation={4}>
      <TableContainer>
        <Table size="small">
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            onSort={sortHandler}
          />
          <TableBody>
            {players
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .sort(getComparator(order, orderBy))
              .map((data) => makePlayerData(data))
              .map((player) => (
                <TableRow key={player.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{player[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
          count={players.length}
          page={page}
          onPageChange={changePageHandler}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={changeRowsPerPageHandler}
        />
      </TableContainer>
    </Paper>
  );
};

export default PlayersTable;
