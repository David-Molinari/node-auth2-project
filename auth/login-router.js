const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");

router.post("/", (req, res) => {
  let { username, password } = req.body;
  if (username != null && password != null) {
    Users.findBy({ username })
        .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: "Welcome!", token });
        } else {
            res.status(401).json({ message: "You cannot pass!" });
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
          });
   } else {
        res.status(500).json({ message: "invalid credentials" });
    }
});

function generateToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
      department: user.department
    };
    const secret = secrets.jwtSecret;
    const options = {
      expiresIn: "1d",
    };
    return jwt.sign(payload, secret, options);
  }

module.exports = router;