const intersectVenueUsers = require("./intersectVenueUsers");
describe("With no users", () => {
  it("Should return an object of cant eat & drink", () => {
    const users = [];
    const venueDrinks = [];
    const venueFoods = [];
    expect(intersectVenueUsers(users, venueDrinks, venueFoods)).toEqual({
      cantDrink: [],
      cantEat: []
    });
  });
});

describe("With users with no food & drink preference", () => {
  it("Should return an object stating they can't drink (no specified drinks)", () => {
    const users = [{ name: "fred" }, { name: "barney" }];
    const venueDrinks = [];
    const venueFoods = [];
    expect(intersectVenueUsers(users, venueDrinks, venueFoods)).toEqual({
      cantDrink: ["fred", "barney"],
      cantEat: []
    });
  });
});

describe("With users specifying only food", () => {
  it("Should return an object stating they can't drink (no specified drinks", () => {
    const users = [
      { name: "fred", wont_eat: ["fish"] },
      { name: "barney", wont_eat: ["chips"] }
    ];
    const venueDrinks = [];
    const venueFoods = [];
    expect(intersectVenueUsers(users, venueDrinks, venueFoods)).toEqual({
      cantDrink: ["fred", "barney"],
      cantEat: []
    });
  });
});

describe("With matching venue foods one person won't eat", () => {
  it("Should return an object withj that persons name in the cantEat section", () => {
    const users = [
      { name: "fred", wont_eat: ["fish"], drinks: ["beer"] },
      { name: "barney", wont_eat: ["chips"], drinks: ["beer"] }
    ];
    const venueDrinks = ["beer", "coke"];
    const venueFoods = ["chips"];
    expect(intersectVenueUsers(users, venueDrinks, venueFoods)).toEqual({
      cantDrink: [],
      cantEat: ["barney"]
    });
  });
});
