const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

console.log(`Effective PORT: ${port}`);

app.get("/", (req, res) => {
    res.json({
        message : "Server is Running"
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})