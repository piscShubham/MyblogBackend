
const express = require('express');
const cors = require('cors');
const Jwt = require('jsonwebtoken');
const coockieparser = require('cookie-parser');
const app = express();
const Routersd = require('./Router/AuthRouter');
const Creteblog=require('./Router/creteblogRouter');
require('dotenv').config();


// middleware 
app.use(cors());
app.use(express.json());
app.use('/', Routersd.router)
app.use('/create',Creteblog.router);
app.use(coockieparser());


// server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});




