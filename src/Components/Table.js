import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "./Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import "./Table.css";

export default function TableDb(props) {
  //Edit component open/close
  const [open, setOpen] = useState(false);

  //current selection and edits states
  const [selectedData, setSelectedData] = useState("");
  const [currentEdits, setCurrentEdits] = useState({});

  //Test: incoming table data
  const [incomingData, setIncomingData] = useState([]);

  /*useEffect(() => {
    fetchTable()
  }, []);*/

  //handlers for buttons

  //Delete by ID
  async function deleteSelection(id) {
    console.log("Deleting: http://localhost:5000/grocery_store/remove/" + id);
    await axios.delete("http://localhost:5000/grocery_store/remove/" + id);
    props.refresh();
  }

  //Edit by ID
  const editSelection = (ob) => {
    setSelectedData(ob);
    console.log("Edit: " + ob);
    handleToggle();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Edit
          refresh={props.refresh}
          selection={selectedData}
          handleClose={handleClose}
          isOpen={open}
        />
      </Backdrop>
      <div className="table-container">
        <div className="table-view-header"></div>

        <TableContainer component={Paper}>
          <Table
            stickyHeader
            size="small"
            sx={{ minWidth: 600 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    background: "#2E2E2E",
                    color: "white",
                    boxShadow: 1,
                    fontWeight: "400",
                    fontSize: "16px",
                    height: "20px",
                  }}
                >
                  Item Name
                </TableCell>
                <TableCell
                  sx={{
                    background: "#2E2E2E",
                    color: "white",
                    boxShadow: 1,
                    fontWeight: "400",
                    fontSize: "16px",
                    height: "20px",
                  }}
                  align="left"
                >
                  <p id="cell-title">Section</p>
                </TableCell>
                <TableCell
                  sx={{
                    background: "#2E2E2E",
                    color: "white",
                    boxShadow: 1,
                    fontWeight: "400",
                    fontSize: "16px",
                    height: "20px",
                  }}
                  align="right"
                >
                  <p id="cell-title">Price ($)</p>
                </TableCell>
                <TableCell
                  sx={{
                    background: "#2E2E2E",
                    color: "white",
                    boxShadow: 1,
                    fontWeight: "400",
                    fontSize: "16px",
                    height: "20px",
                  }}
                  align="right"
                >
                  <p id="cell-title">Stock</p>
                </TableCell>
                <TableCell
                  sx={{
                    background: "#2E2E2E",
                    color: "white",
                    boxShadow: 1,
                    fontWeight: "400",
                    fontSize: "16px",
                    height: "20px",
                  }}
                  align="right"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data != null &&
                props.data.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="table-data"
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="left">{item.section}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell className="table-buttons" align="right">
                      <IconButton
                        color="primary"
                        aria-label="add an alarm"
                        onClick={() => editSelection(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="add an alarm"
                        onClick={() => deleteSelection(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
