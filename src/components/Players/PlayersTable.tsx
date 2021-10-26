// @ts-ignore
import CountryFlag from "react-country-flag";
import { Typography } from "@mui/material";
import LinkRouter from "../UI/LinkRouter";
import { countryCodes } from "../../lib/country-codes";
import EnhancedTable from "../UI/Table/EnhancedTable";
import { Column } from "../UI/Table/enhanced-table";

type PlayerData = {
  id: number;
  country: string;
  last_name: string;
  first_name: string;
  rating: number;
};

const columns: readonly Column[] = [
  { id: "country", label: "Country", disablePadding: false, numeric: false },
  {
    id: "last_name",
    label: "Last name",
    disablePadding: false,
    numeric: false,
  },
  {
    id: "first_name",
    label: "First name",
    disablePadding: false,
    numeric: false,
  },
  { id: "rating", label: "Rating", disablePadding: false, numeric: false },
];

const makeRowData = (player: PlayerData): any => ({
  country: (
    <CountryFlag
      svg
      countryCode={player.country}
      title={countryCodes.find((item) => item.code === player.country)?.label}
      style={{ height: "2rem", width: "2rem" }}
    />
  ),
  last_name: (
    <LinkRouter to={`/players/${player.id}`}>
      <Typography>{player.last_name}</Typography>
    </LinkRouter>
  ),
  first_name: (
    <LinkRouter to={`/players/${player.id}`}>
      {" "}
      <Typography>{player.first_name}</Typography>
    </LinkRouter>
  ),
  rating: <Typography>{player.rating}</Typography>,
});

type Props = {
  players: PlayerData[];
};

const PlayersTable = (props: Props) => {
  const { players } = props;
  return (
    <EnhancedTable
      rows={players}
      makeRowData={makeRowData}
      title="Players"
      columns={columns}
      defaultOrder="desc"
      defaultOrderBy="rating"
    />
  );
};

export default PlayersTable;
