const express = require("express");
const limiter = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const checkDb = require("./utils/checkDbConnection");
const authRoute = require("./routes/api/auth.route");
const todoRoute = require("./routes/api/todo.route");
const db = require('./mongodb/db')

const app = express();
const port = process.env.PORT || 3001;
const rateLimit = limiter({
  windowMs: 30 * 60 * 1000, //30 min
  max: 120,
  message: {
    code: 429,
    msg: "too many requests from your ip, please try again later in 30 min",
  },
});

db.on('error', console.error.bind(console, 'MongoDB Not Connected:'))
app.use(rateLimit);

// secure HTTP headers
app.use(helmet());

//CHECK db if Connected
// app.use(checkDb);

app.use(express.json({ extended: false, limit: "40kb" }));
app.use(
  compression({
    level: 6,
  })
);

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

app.listen(port, () => {
  console.log("Express server listening to port ", `http://localhost:${port}`);
});
