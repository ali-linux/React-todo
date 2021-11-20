const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Auth = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, ref: "users", required: false }
  },
  { timestamps: true },
)

module.exports = mongoose.model('auth', Auth)
