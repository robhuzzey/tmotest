const express = require("express");
const app = express();

const users = require("./data/users.json");
const venues = require("./data/venues.json");
const filterUsers = require("./helpers/filterUsers");
const intersectVenueUsers = require("./helpers/intersectVenueUsers");

app.get("/usernames", function(req, res) {
  return res.json(
    users.map(user => {
      return user.name;
    })
  );
});

app.get("/venues", function(req, res) {
  const { query = {} } = req;
  const { filterBy = {} } = query;
  if (filterBy.users) {
    const filteredUsers = filterUsers(filterBy.users, users);
    const excludedVenues = venues.reduce((excluded, venue) => {
      const venueFoods = venue.food.map(food => food.toLowerCase());
      const venueDrinks = venue.drinks.map(drink => drink.toLowerCase());
      const { cantDrink, cantEat } = intersectVenueUsers(
        filteredUsers,
        venueDrinks,
        venueFoods
      );
      if (cantEat.length || cantDrink.length) {
        excluded.push({
          name: venue.name,
          cantEat,
          cantDrink
        });
      }
      return excluded;
    }, []);

    const allowedVenues = venues.filter(venue => {
      return !excludedVenues.find(excluded => excluded.name === venue.name);
    });

    return res.json({
      allowed: allowedVenues,
      excluded: excludedVenues
    });
  }
  return res.json({
    allowed: venues,
    excluded: []
  });
});

app.listen(process.env.PORT || 8080);
