export type Order = "asc" | "desc";

export type Column = {
  id: Key;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
};
