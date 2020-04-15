const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatesSchema = new Schema({
    states: { type: Array},
    created_at : {type: Date, index : true, default: Date.now}
})

const States = mongoose.model("States", StatesSchema);

module.exports = States;