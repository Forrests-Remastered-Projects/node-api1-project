// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
server.listen(8000, () => console.log("server is running :)"));
