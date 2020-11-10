const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    favoriteFoods: { type: Array }
})


module.exports = Person = mongoose.model('Person', PersonSchema)