const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const Sequelize = require("sequelize");
require("dotenv").config();
const app = express();

//  Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const sequelize = new Sequelize("GBH", "root", "password", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./app/client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);    
});