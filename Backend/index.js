const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const login = require("./login");
const tshirtRoutes = require("./tshirt"); 
const hoodieRoutes = require("./hoodie")
const pantsRoutes = require("./pants")
const shoesRoutes = require("./shoes");
const bagRoutes = require("./bag");
const produktetRoutes = require('./products');
const orderRoutes = require("./order");
const contactusRouter = require('./contactus')


app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use(login);
app.use("/", tshirtRoutes);  // <- Këtu ndryshimi, pa "/tshirt" sepse router përmban rrugët e plota
app.use("/", shoesRoutes);
app.use("/", hoodieRoutes);
app.use("/", pantsRoutes);
app.use("/bag", bagRoutes);
app.use("/produktet", produktetRoutes);
app.use("/api", orderRoutes);
app.use("/api", contactusRouter);

app.listen(3002, () => {
  console.log("Server is listening on port 3002");
});
