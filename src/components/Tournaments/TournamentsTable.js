import { useState } from "react";
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

const columns = [
  { id: "country", label: "Country" },
  { id: "name", label: "Name" },
  { id: "date_start", label: "Date Start" },
  { id: "date_end", label: "Date End" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
const SortableTableHead = (props) => {
  const { order, orderBy, onSort } = props;

  const createSortHandler = (property) => (event) => {
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

const makeTournamentData = (data) => ({
  id: data.id,
  country: (
    <CountryFlag
      svg
      countryCode={data.country}
      title={countryCodes.find((item) => item.code === data.country).label}
      style={{ height: "2rem", width: "2rem" }}
    />
  ),
  name: <LinkRouter to={`/tournaments/${data.id}`}>{data.name}</LinkRouter>,
  date_start: <Typography>{data.date_start}</Typography>,
  date_end: <Typography>{data.date_end}</Typography>,
});

const TournamentsTable = (props) => {
  const { tournaments } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("rating");

  const sortHandler = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const changePageHandler = (event, newPage) => setPage(newPage);
  const changeRowsPerPageHandler = (event) => {
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
            {tournaments
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .sort(getComparator(order, orderBy))
              .map((data) => makeTournamentData(data))
              .map((tournament) => (
                <TableRow key={tournament.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {tournament[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
          count={tournaments.length}
          page={page}
          onPageChange={changePageHandler}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={changeRowsPerPageHandler}
        />
      </TableContainer>
    </Paper>
  );
};

export default TournamentsTable;
