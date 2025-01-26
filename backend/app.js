const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const Books = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());
app.use(express.json());
//routers
app.use("/api/v1",user);
app.use("/api/v1",Books);
app.use("/api/v1",favourite);
app.use("/api/v1",cart);
app.use("/api/v1",Order);

app.listen(process.env.PORT, () => {
    console.log(`Server Started ${process.env.PORT}`);
});