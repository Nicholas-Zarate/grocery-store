import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Table from "./Table";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import { defaultInventoryData } from "../Data/GroceryStore";
import CreateItem from "./CreateItem.js";
import Divider from "@mui/material/Divider";

import "./Main.css";

//Toggle show Create Item form
function handleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function Main() {
  const [defaultData, setDefaultData] = useState(defaultInventoryData);
  const [incomingData, setIncomingData] = useState([]);
  const [dbUrl, setDbUrl] = useState(`http://localhost:5000/grocery_store`);

  //------Data Handling------

  //Reset, ClearBoard, and Refresh
  const clearBoard = () => {
    setIncomingData([]);
  };

  const refresh = () => {
    clearBoard();
    fetchTable();
  };

  async function reset() {
    await axios.delete(dbUrl + "/remove-all").then(console.log("Deleted all"));
    await axios.post(dbUrl + "/add-all", JSON.stringify(defaultData), {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });

    setTimeout(function () {
      refresh();
    }, 500);
  }

  //Fetch Data

  const fetchTable = () => {
    axios.get(dbUrl).then((response) => {
      response.data.map((entry) =>
        setIncomingData((current) => [
          ...current,
          {
            id: entry._id,
            name: entry.name,
            section: entry.section,
            price: entry.price,
            quantity: entry.quantity,
          },
        ])
      );
      console.log(response.data);
    });
  };

  return (
    <div className="screen">
      <div className="nav">
        <div className="nav-main">
          <h2>Grocery Store</h2>
          <span>
            <p>A component based minimal template for CRUD applications</p>
          </span>
          <h1>Nicholas Zarate</h1>
        </div>
        <div className="nav-sub"></div>
      </div>
      <div className="sidebar"></div>
      <div className="dashboard">
        <Grid
          className="dashboard-container"
          container
          columns={12}
          rowSpacing={0}
          columnSpacing={2}
        >
          <Grid item xs={10} md={7} lg={3} sx={{ mb: "10rem" }}>
            <h1 className="dropdown-title">Operations</h1>
            <Divider light="true" variant="middle" sx={{ mb: "10px" }} />

            <div class="dropdown">
              <button onClick={handleDropdown} className="dropbtn">
                Create New Item
              </button>
              <div id="myDropdown" class="dropdown-content">
                <CreateItem
                  handleClose={handleDropdown}
                  dbUrl={dbUrl}
                  refresh={refresh}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={7} lg={6}>
            <div className="table-actions-container">
              {/*<div className="table-actions-title">Table Actions</div>*/}
              <div className="table-actions">
                <button onClick={() => reset()}>Reset Collection</button>
                <button onClick={() => clearBoard()}>Clear Board</button>
                <button onClick={() => refresh()}>Refresh</button>
              </div>
            </div>

            <Table
              data={incomingData}
              refresh={refresh}
              incomingData={incomingData}
              clearBoard={clearBoard}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Main;
