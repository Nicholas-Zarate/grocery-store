const express = require("express");
const router = express.Router();

const Item = require('../models/itemModel');

//View all
router.get('/', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})


//View by
router.get('/:id', getItem, (req, res) => {
  res.send(res.item.name)
})


//Create item
router.post('/', async (req, res) => {


  const item = new Item({
    name: req.body.name,
    section: req.body.section,
    price: req.body.price,
    quantity: req.body.quantity
  })

  try {
    const newItem = await item.save()
    res.status(201).json(newItem)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

//Create all
router.post('/add-all', async (req, res) => {

  try {
    console.log(req.body[0].items);
    const newItems = await Item.insertMany(req.body[0].items);
    console.log("Data inserted")
    res.status(201).json({message: "Reset collection", items: newItems})
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})




//Update item
router.patch('/:id', getItem, async (req, res) => {
  if(req.body.name != null){
    res.item.name = req.body.name
  }
  if(req.body.section != null){
    res.item.section = req.body.section
  }
  if(req.body.price != null){
    res.item.price = req.body.price
  }
  if(req.body.quantity != null){
    res.item.quantity = req.body.quantity
  }
  try {
    const updatedItem = await res.item.save()
    res.json(updatedItem)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})


//Delete item
router.delete('/remove/:id', getItem, async (req, res) => {
  try {
    await res.item.remove()
    res.json({message: "Delete succesful"})
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

//Delete all
router.delete('/remove-all', async (req,res) => {

  try {
    const delItems = await Item.deleteMany({_id: {$ne: null}}).then(()=>{console.log("Data deleted")});
    res.status(200).json({message: "Delete All succesful"});
  } catch (err) {
    res.json({message: err.message})
  }
})

//middleware for id
async function getItem(req,res,next){
  let item
  try {
    item = await Item.findById(req.params.id)
    if(item == null){
      return res.status(404).json({message: "Cannot find grocery item"})
    }
  } catch(err) {
    return res.status(500).json({message: err.message})
  }
  res.item = item
  next()
}

module.exports = router
