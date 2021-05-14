const express = require("express");
const app = express();
const authRoute = require("./routes/api/auth.route");
const todoRoute = require("./routes/api/todo.route");
const port = process.env.PORT || 3000;
app.use(express.json({ extended: false }), (req, res, next) => {
  console.log("IN SERVER.JS RUNNING BODYPARSER MIDDLEWARE ");
  next();
});

app.get("/", (req, res, next) => res.send("working"));

app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

app.listen(port, () => {
  console.log("Express server listening to port ", `http://localhost:${port}`);
});
