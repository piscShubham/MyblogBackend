const bcrypt = require("bcrypt");
const { execute } = require("../Database/Connection");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
const coockieparser = require("cookie-parser");

const authcontroller = {
  Signup: async (req, res) => {
    try {
      let data = req.body;
      const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds
      data.password = hashedPassword;
      let emails = data.email;
      console.log(data.password);
      const query = "INSERT INTO authentication SET ?";
      const result = await execute(query, data);

      res.status(201).json({ message: "Signup successful", emails });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  Login: async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM authentication WHERE email = ? ";
    const userData = await execute(sql, [email]);
    if (!userData.length) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }
    const user = userData[0];
    // Compare hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (result) {
        // Passwords match
        const token = generateToken(email);
        res.json({ token: token, email });
      } else {
        // Passwords don't match
        return res.status(401).json({ message: "Incorrect password" });
      }
    });
  },
};
function generateToken(email) {
  const token = Jwt.sign({ email }, process.env.secretkey, { expiresIn: "1h" });
  return token;
}
module.exports = authcontroller;
