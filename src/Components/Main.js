import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Table from './Table';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';
import {defaultInventoryData} from '../Data/GroceryStore';


import './Main.css';


function Main() {


  const [priceErrorColor, setPriceErrorColor] = useState('primary');
  const [priceErrorHelperText, setPriceErrorHelperText] = useState('');

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [section, setSection] = useState('');


  const [defaultData, setDefaultData] = useState(defaultInventoryData);
  const [incomingData, setIncomingData] = useState([]);
  const [dbUrl, setDbUrl] = useState(`http://localhost:5000/grocery_store`);


  //Import default data
  console.log(defaultInventoryData)

  //------Input validation------

  //--Type validation---
  function isFloat(n) {
      return n === +n && n !== (n|0);
  }

  function isInteger(n) {
    return n === +n && n === (n|0);
  }

  //Validation handling
  const handleIsNum = (v) => {

    console.log(isNaN(parseFloat(v)))
    if(isNaN(parseFloat(v))) {
      setPriceErrorHelperText('Not a number');
      setPriceErrorColor('error');
      console.log("Is not a float :)")
    } else {
      setPriceErrorHelperText('Price');
      setPriceErrorColor('primary');
      console.log("Is a number :)")
    }

  }

  //Selection clicked handler
  const handleChange = (event) => {
    setSection(event.target.value);
  };


  //------Data Handling------
  
  //Reset, ClearBoard, and Refresh
  const clearBoard = () => {
    setIncomingData([])

  }

  const refresh = () => {
    clearBoard()
    fetchTable()
  }

  async function reset() {
    await axios.delete(dbUrl+'/remove-all').then(console.log("Deleted all"));
    await axios.post(dbUrl+'/add-all', JSON.stringify(defaultData), {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }});
    
      setTimeout(function(){
        refresh();
      },500);

    

  }


  //Fetchers

  const fetchTable = () => {
    axios.get(dbUrl).then((response) => {
      response.data.map( (entry) => (
        setIncomingData(current => [...current,
          {
            id: entry._id,
            name: entry.name,
            section: entry.section,
            price: entry.price,
            quantity: entry.quantity
          }
        ])

      ))
      console.log(response.data);


    });
  }

  async function addItem() {
    if(name && section && price && quantity){
          console.log("Item added: "+name+section+price+quantity)
          const data = {
            name: name,
            section: section,
            price: parseFloat(price),
            quantity: parseFloat(quantity)
          }

          //Make POST request using Axios
          await axios.post(
            dbUrl,
            JSON.stringify(data), {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }
          });

          refresh()

    }
  }



  return (
    <div className="screen">
      <div className="nav">
        <div className="nav-main">
          <h2>Grocery Store</h2>
          <span><p>A component based minimal template for CRUD applications</p></span>
          <h1>Nicholas Zarate</h1>
        </div>
        <div className="nav-sub">

        </div>
      </div>
      <div className="sidebar">
        
      </div>
      <div className="dashboard">
      <Grid className="dashboard-container" container columns={12} rowSpacing={0} columnSpacing={2}>
        <Grid item xs={10} md={3} className="operations-crud create">
          <div className="title">Create Product</div>
          <div className="createForm">
            <div id="col1-create">
            <TextField
              onChange={(e) => {
                  setName(e.target.value)
                }}
              color="primary"
              id="outlined-basic"
              label="Product Name"
              variant="outlined" />
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
              color={priceErrorColor}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => {
                  handleIsNum(e.target.value);
                  setPrice(e.target.value)
                }}
            />
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={(e) => {
                  setQuantity(e.target.value)
                }}
            />
            </div>

          </div>
          <div className="submit-button-container">
          <Button
            color="success"
            id="submitMUI"
            onClick={()=>addItem()}
            variant="contained"
            startIcon={<PublishIcon className="iconToFlip"/>}>
            Sumbit</Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="table-actions-container">
                <div className="table-actions-title">Table Actions</div>
          <div className="table-actions">
            <button onClick={()=> reset()}>Reset Collection</button>
            <button onClick={() => clearBoard()}>Clear Board</button>
            <button onClick={()=> refresh()}>Refresh</button>
          </div>
          </div>

          <Table data={incomingData} refresh={refresh} incomingData={incomingData} clearBoard={clearBoard}/>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default Main
