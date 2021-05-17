const { db } = require("../config/db");

module.exports = (req, res, next) => {
  db.raw("select 1+1 as result").catch((err) => {
    return res.status(500).json({
      errors: [
        {
          msg: "database issue please try again later",
        },
      ],
    });
  });
  next();
};
