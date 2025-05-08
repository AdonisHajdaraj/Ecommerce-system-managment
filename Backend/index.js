const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const login = require("./login");
const tshirtRoutes = require("./tshirt"); 
const shoesRoutes = require("./shoes"); // Importo tshirt
const bagRoutes = require("./bag"); // Importo tshirt
const produktetRoutes = require('./products');
const orderRoutes = require("./order");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(login);
app.use("/tshirt", tshirtRoutes); // ✅ Përdor tshirt.js
app.use("/shoes", shoesRoutes); // ✅ Përdor tshirt.js
app.use("/bag", bagRoutes); // ✅
app.use("/produktet", produktetRoutes); // ✅
app.use("/api", orderRoutes);





app.listen(3002, () => {
  console.log("Server is listening on port 3002");
});
