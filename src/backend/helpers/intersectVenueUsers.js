const intersection = require("lodash.intersection");
const intersectVenueUsers = (users, venueDrinks, venueFoods) => {
  return users.reduce(
    (acc, user) => {
      const wontEat = (user.wont_eat || []).map(food => food.toLowerCase());
      const userDrink = (user.drinks || []).map(drink => drink.toLowerCase());
      const matchDrinks = intersection(venueDrinks, userDrink);
      const matchFoods = intersection(venueFoods, wontEat);
      if (matchFoods.length > 0) {
        acc.cantEat.push(user.name);
      }
      if (matchDrinks.length === 0) {
        acc.cantDrink.push(user.name);
      }
      return acc;
    },
    {
      cantDrink: [],
      cantEat: []
    }
  );
};

module.exports = intersectVenueUsers;
