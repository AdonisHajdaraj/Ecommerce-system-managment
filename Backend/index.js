const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const login = require('./login');




const path = require('path');


const secretKey = 'my_secret_key';

app.use(express.json())
app.use(cors())

const db = require('./db');


app.use(login);




app.listen(3002, () => {
  console.log("Server is listening on port 3002");
})








