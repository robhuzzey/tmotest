const filterUsers = require("./filterUsers");
it("Should ignore casing", () => {
  const crazyString = "Fred, BarNey, WiLMA, DINo";
  const user1 = { name: "barnEy" };
  const users = [user1];
  expect(filterUsers(crazyString, users)).toEqual([user1]);
});

it("Should ignore white space", () => {
  const crazyString = "    Fred   ,      BarNey     , WiLMA  , ,,  , ,   ,DINo";
  const user1 = { name: "barnEy" };
  const users = [user1];
  expect(filterUsers(crazyString, users)).toEqual([user1]);
});
