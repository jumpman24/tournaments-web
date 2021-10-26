import { ChangeEvent, MouseEvent } from "react";
import { TablePagination } from "@mui/material";

type Props = {
  rowCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions: number[];
};

const EnhancedTablePagination = (props: Props) => {
  const {
    rowCount,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions,
  } = props;

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={rowCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default EnhancedTablePagination;
