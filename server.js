const express = require("express");
const { db } = require("./config/db");
const app = express();
const authRoute = require("./routes/api/auth.route");
const todoRoute = require("./routes/api/todo.route");
const port = process.env.PORT || 3000;
//CHECK db if Connected
app.use((req, res, next) => {
  db.raw("select 1+1 as result").catch((err) => {
    return res.status(500).json({
      errors: [
        {
          msg: "Server error",
        },
      ],
    });
  });
  next();
});
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
