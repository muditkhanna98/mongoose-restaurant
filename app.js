/*
ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy.
No part of this assignment has been copied manually or electronically from any other source * (including web sites) or distributed to other students.
Name: Mudit Khanna, Viraj Paneliya
Student ID: N01487943, N01512139
Date: 22nd April, 2023
*/

const express = require("express");
//import the db module
const db = require("./modules/db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//get the port and connection string from the env file
const PORT = process.env.PORT;
const connection = process.env.CONN;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//function to establish connection with the mongodb atlas
const start = async () => {
  await db.initialize(connection);
};

start();

//post end point to add documents to the db
app.post("/api/restaurants", (req, res) => {
  db.addNewRestaurant(req.body)
    .then((restaurant) => res.status(201).json(restaurant))
    .catch((error) => res.status(500).json({ message: error.message }));
});

//get end point to get record with that id
app.get("/api/restaurants/:id", (req, res) => {
  const id = req.params.id;
  db.getRestaurantById(id)
    .then((restaurant) => res.status(201).json(restaurant))
    .catch((error) => res.status(500).json({ message: error.message }));
});

//get end point to get all the restaurants and filter with page and borough
app.get("/api/restaurants", (req, res) => {
  const { page, perPage, borough } = req.query;
  db.getAllRestaurants(page, perPage, borough)
    .then((restaurant) => res.status(201).json(restaurant))
    .catch((error) => res.status(500).json({ message: error.message }));
});

//put end point to edit a document with an id
app.put("/api/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  db.updateRestaurantById(data, id)
    .then((restaurant) => res.status(201).json(restaurant))
    .catch((error) => res.status(500).json({ message: error.message }));
});

//delete one document with id
app.delete("/api/restaurants/:id", (req, res) => {
  const id = req.params.id;

  db.deleteRestaurantById(id)
    .then((restaurant) => res.status(201).json(restaurant))
    .catch((error) => res.status(500).json({ message: error.message }));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
