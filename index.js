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
server.post("/api/users", (req, res) => {
  console.log(req.body);
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ error: "Requires name and bio" });
  } else {
    db.insert({ name, bio })
      .then(({ id }) => {
        db.findById(id)
          .then(user => {
            res.status(201).json(user);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "server error retrieving user" });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "server error inserting user" });
      });
  }
});
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      console.log("user", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "This user does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The users info could not be retrieved" });
    });
});
server.listen(8000, () => console.log("server is running :)"));
