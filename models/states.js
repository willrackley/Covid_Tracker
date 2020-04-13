const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatesSchema = new Schema({
    state: { type: String},
    totalCases: { type: Number },
    totalDeaths: { type: Number }, 
    totalRecovered: {type: Number }
})

const States = mongoose.model("States", StatesSchema);

module.exports = States;