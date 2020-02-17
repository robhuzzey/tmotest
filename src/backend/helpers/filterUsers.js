const trim = require("lodash.trim");
const filterUsers = (name, users) => {
  const names = name.split(",").map(name => {
    return trim(name).toLowerCase();
  });
  return users.filter(user => {
    return names.indexOf(user.name.toLowerCase()) !== -1;
  });
};
module.exports = filterUsers;
