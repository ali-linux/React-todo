const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Todo = new Schema(

  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "auth", required: false }
  },
  { timestamps: true },
)

module.exports = mongoose.model('todo', Todo)
