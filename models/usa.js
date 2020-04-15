const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsaSchema = new Schema({
    totalCases: { type: Number },
    totalDeaths: { type: Number }, 
    created_at : {type: Date, index : true, default: Date.now}
})

const Usa = mongoose.model("Usa", UsaSchema);

module.exports = Usa;