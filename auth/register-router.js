const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

router.post("/", (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 14;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  if (user.username != null && user.password != null) {
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
      });
  } else {
    res.status(500).json({ message: "error: please add valid user and password" });
  }
});

module.exports = router;