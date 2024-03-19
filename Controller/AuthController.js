
const bcrypt = require('bcrypt');
const { execute } = require("../Database/Connection");
const Jwt = require('jsonwebtoken');
require('dotenv').config();
const coockieparser = require('cookie-parser');


const authcontroller = {
  Signup: async (req, res) => {
    try {
      let data = req.body;
      const hashedPassword = await bcrypt.hash(data.password, 10); 
      data.password = hashedPassword;
      delete data.password;
      let emails=data.email;
      const query = 'INSERT INTO authentication SET ?';
      const result = await execute(query, data);
      res.status(201).json({ message: 'Signup successful', emails });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
    }
  },
}



module.exports = authcontroller;
