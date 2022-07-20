import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

import "./Edit.css";

export default function Edit(props) {
  //States for edits
  const [sectionEdit, setSectionEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [quantityEdit, setQuantityEdit] = useState("");

  //Handling behavior on open including setting input values to current selection
  const [isOpen, setIsOpen] = useState(false);

  if (props.isOpen && isOpen == false) {
    setSectionEdit(props.selection.section);
    setNameEdit(props.selection.name);
    setPriceEdit(props.selection.price);
    setQuantityEdit(props.selection.quantity);
    console.log("useeffect");

    setIsOpen(true);
  }

  const handleClose = () => {
    props.handleClose();
    setIsOpen(false);
  };

  //Handle selection edit
  const handleChange = (event) => {
    setSectionEdit(event.target.value);
  };

  //---Handle Submitting of Update Request---

  const handleSubmit = () => {
    //First create json from set states
    let dataSend = {};
    if (nameEdit != "") {
      dataSend.name = nameEdit;
    }
    if (sectionEdit != "") {
      dataSend.section = sectionEdit;
    }
    if (priceEdit != "") {
      dataSend.price = priceEdit;
    }
    if (quantityEdit != "") {
      dataSend.quantity = quantityEdit;
    }

    //Send axios update
    sendEdit(dataSend);
    //Close Panel
    handleClose();
    //Refresh
    setTimeout(function () {
      props.refresh();
    }, 500);
  };

  //Submiting patch request
  async function sendEdit(dat) {
    await axios.patch(
      `http://localhost:5000/grocery_store/` + props.selection.id,
      JSON.stringify(dat),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );
  }

  return (
    <div className="edit-container">
      <div className="edit-header">
        <div id="col">
          <div id="display-id">{props.selection.id}</div>
          <div id="display-name">{props.selection.name}</div>
          <div id="display-section">{props.selection.section}</div>
        </div>
        <div id="col2">
          <div id="display-price">Price: ${props.selection.price}</div>
          <div id="display-quantity">
            Quantity: n={props.selection.quantity}
          </div>
        </div>
      </div>
      <div className="edit-subheader">
        <h2 id="subheader-text">EDIT</h2>
      </div>
      <div className="edit-operations">
        <TextField
          color="primary"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={nameEdit}
          onChange={(e) => {
            setNameEdit(e.target.value);
          }}
        />
        <div>
          <FormControl>
            <InputLabel id="section-simple-select-label">Section</InputLabel>
            <Select
              labelId="section-simple-select-label"
              id="simple-select"
              value={sectionEdit}
              label="Section"
              onChange={handleChange}
            >
              <MenuItem value="Produce">Produce</MenuItem>
              <MenuItem value="Meats">Meat</MenuItem>
              <MenuItem value="Packaged Good">Packaged Goods</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField
          color="primary"
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={priceEdit}
          onChange={(e) => {
            setPriceEdit(e.target.value);
          }}
        />
        <TextField
          color="primary"
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          value={quantityEdit}
          onChange={(e) => {
            setQuantityEdit(e.target.value);
          }}
        />
      </div>
      <div className="edit-buttons">
        <Button
          color="primary"
          variant="contained"
          id="edit-submit"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <Button
          color="error"
          startIcon={<CancelIcon />}
          onClick={() => {
            handleClose();
          }}
        ></Button>
      </div>
    </div>
  );
}
