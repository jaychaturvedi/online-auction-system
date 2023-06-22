import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link, useParams } from "react-router-dom";
import { routeEnum } from "../../utils/enum";
import api from "../../config/api";
import Countdown from "../Layout/Countdown";
import moment from "moment";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useStore } from "../../store/useStore";
import Filter from "./Filter";
import showNotification from "../../utils/notification";
import debounce from "../../utils/debounce";
interface Column {
  id:
    | "name"
    | "startingPrice"
    | "currentPrice"
    | "status"
    | "auctionEndTime"
    | "Bids"
    | "placeBid";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: Record<string, any>) => any;
}

interface Data {
  name: string;
  currentPrice: string;
  status: number;
  auctionEndTime: number;
  bids: number;
  placeBid: number;
}

export default function ItemList() {
  const { state, dispatch } = useStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);
  const firstRender = useRef(true);
  const columns: readonly Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "startingPrice", label: "Starting Price", minWidth: 100 },
    {
      id: "currentPrice",
      label: "Current Price",
      minWidth: 100,
      format: (record) => {
        return record.currentPrice || "No Bids";
      },
    },
    {
      id: "auctionEndTime",
      label: "Expiry Duration",
      minWidth: 170,
      align: "right",
      format: (record) => <Countdown endDate={record.auctionEndTime} />,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "right",
      // format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "Bids",
      label: "Number of Bids",
      minWidth: 170,
      align: "center",
      format: (record) => {
        return record?.Bids.length;
      },
    },
    {
      id: "placeBid",
      label: "Place Bids",
      minWidth: 170,
      align: "center",
      format: (record) => {
        if (record.status !== "open") {
          return "Item Closed for Bid";
        }
        if (record.sellerId === state.user.id) {
          return <div>You are owner</div>;
        }
        return (
          <button>
            <Link to={routeEnum.itemDetails.replace(":id", record.id)}>
              Place
            </Link>
          </button>
        );
      },
    },
  ];
  async function getAllItems() {
    let query = "";
    if (filter === "all") {
      query = "";
    }
    if (filter !== "all") {
      query += `status=${filter}`;
    }
    const resp = await api.item.getAllItems(query);
    if (resp.status) {
      setItems(resp.body);
    }
  }

  useEffect(() => {
    getAllItems();
  }, [filter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div>List of Item </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Filter
          value={filter}
          onChange={(val) => {
            setFilter(val);
          }}
        />
        <RefreshIcon
          onClick={debounce(() => {
            getAllItems();
            showNotification("Fetched Data");
          })}
        />
      </div>

      <br />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
