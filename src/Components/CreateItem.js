import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

import "./CreateItem.css";

export default function CreateItem(props) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [section, setSection] = useState("");

  const [priceErrorColor, setPriceErrorColor] = useState("primary");
  const [priceErrorHelperText, setPriceErrorHelperText] = useState("");

  //------Input validation------

  //Type validation
  function isFloat(n) {
    return n === +n && n !== (n | 0);
  }

  function isInteger(n) {
    return n === +n && n === (n | 0);
  }

  //Handle validation
  const handleIsNum = (v) => {
    console.log(isNaN(parseFloat(v)));
    if (isNaN(parseFloat(v))) {
      setPriceErrorHelperText("Not a number");
      setPriceErrorColor("error");
      console.log("Is not a float :)");
    } else {
      setPriceErrorHelperText("Price");
      setPriceErrorColor("primary");
      console.log("Is a number :)");
    }
  };

  //Selection dropdown handler
  const handleChange = (event) => {
    setSection(event.target.value);
  };

  //POST Item
  async function addItem() {
    if (name && section && price && quantity) {
      console.log("Item added: " + name + section + price + quantity);
      const data = {
        name: name,
        section: section,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      };

      //Make POST request using Axios
      await axios.post(props.dbUrl, JSON.stringify(data), {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      });

      props.refresh();
    }
  }

  return (
    <div className="operations-crud create">
      <div className="title">
        Create Product
        <Button
          color="error"
          startIcon={<CancelIcon />}
          onClick={() => {
            props.handleDropdown();
          }}
        ></Button>
      </div>
      <div className="createForm">
        <div id="col1-create">
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            size="small"
            color="primary"
            id="outlined-basic"
            label="Product Name"
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="section-simple-select-label">Section </InputLabel>
            <Select
              labelId="section-simple-select-label"
              id="demo-simple-select"
              value={section}
              label="Section"
              onChange={handleChange}
            >
              <MenuItem value="Produce">Produce</MenuItem>
              <MenuItem value="Meats">Meat</MenuItem>
              <MenuItem value="Packaged Good">Packaged Goods</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div id="col2-create">
          <TextField
            size="small"
            color={priceErrorColor}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => {
              handleIsNum(e.target.value);
              setPrice(e.target.value);
            }}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="submit-button-container">
        <Button
          color="success"
          id="submitMUI"
          onClick={() => addItem()}
          variant="contained"
          startIcon={<PublishIcon className="iconToFlip" />}
        >
          Sumbit
        </Button>
      </div>

      {/*End of Create Form */}
    </div>
  );
}
