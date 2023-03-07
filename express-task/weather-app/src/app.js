const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const public = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

app.use(express.static(public));
app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shah Shubham",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    tittle: "About Me",
    about: "You Get Accurate Weather From Here",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: "something helpful",
    tittle: "Help",
  });
});

app.get("/help/*", (req, res) => res.render("404page"));

app.get("/about/*", (req, res) => res.render("404page"));

app.listen(5000, () => {
  console.log("port is running on 5000");
});
