const fs = require("fs");
const path = require("path");

const loadTypes = type => {
  return new Promise((resolve, reject) => {
    const pathToType = path.join(
      process.cwd(),
      `backend/types/${type}/${type}.gql`
    );
    fs.readFile(pathToType, "utf8", (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

module.exports = loadTypes;
