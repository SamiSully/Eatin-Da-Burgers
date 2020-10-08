
const express = require("express");
const exphbs = require("express-handlebars");
const connection = require("./config/connection.js")

const app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.get("/", (req, res)=> {
    connection.query("SELECT * FROM burger", (err, data) => {
        console.table(data)
    });
    res.render("index");
})

app.get("/api/config", (req, res) => {
    res.json({
        success: true,
    })
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});