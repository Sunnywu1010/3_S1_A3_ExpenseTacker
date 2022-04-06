const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const bodyParse = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const routes = require("./routes");
require("./config/mongoose");
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(flash());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes);
app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}`);
});
