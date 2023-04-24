/*
ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy.
No part of this assignment has been copied manually or electronically from any other source * (including web sites) or distributed to other students.
Name: Mudit Khanna, Viraj Paneliya
Student ID: N01487943, N01512139
Date: 22nd April, 2023
*/

const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  address: {
    building: {
      type: "Date",
    },
    coord: {
      type: ["Number"],
    },
    street: {
      type: "String",
    },
    zipcode: {
      type: "Date",
    },
  },
  borough: {
    type: "String",
  },
  cuisine: {
    type: "String",
  },
  grades: {
    type: ["Mixed"],
  },
  name: {
    type: "String",
  },
  restaurant_id: {
    type: "String",
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurant");

initialize = (connectionString) => {
  return mongoose
    .connect(connectionString)
    .then(console.log("Connection established"))
    .catch((err) => {
      console.error(err);
    });
};

addNewRestaurant = (data) => {
  const restaurant = new Restaurant(data);
  return restaurant.save();
};

getAllRestaurants = (page, perPage, borough) => {
  const skip = (page - 1) * perPage;
  let query = Restaurant.find()
    .sort({ restaurant_id: 1 })
    .skip(skip)
    .limit(perPage);
  if (borough) {
    query = query.where({ borough });
  }
  return query.exec();
};

getRestaurantById = (id) => {
  return Restaurant.findById(id).exec();
};

updateRestaurantById = (data, id) => {
  return Restaurant.findByIdAndUpdate(id, data, { new: true }).exec();
};

deleteRestaurantById = (id) => {
  return Restaurant.deleteOne({ _id: id }).exec();
};

module.exports = {
  initialize,
  getAllRestaurants,
  getRestaurantById,
  addNewRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
};
