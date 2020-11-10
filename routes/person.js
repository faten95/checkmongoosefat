const express = require('express')
const router = express.Router()
const Person = require('../model/Person')


// test route
// @ route : localhost:4000/persons/test
router.get('/test', (req, res) => {
    res.send("this is a test")
})
// Create and save
// @ route : localhost:4000/persons/createPerson
router.post('/createPerson', (req, res) => {
    const { name, age, favoriteFoods } = req.body
    const newPerson = new Person({
        name,
        age,
        favoriteFoods
    })
    newPerson.save()
        .then(persons => res.send(persons))
        .catch(err => console.log(err))
})

// Find person by name
router.get('/:name', (req, res) => {
    const { name } = req.params
    Person.find({ name})
        .then(persons => res.send(persons))
        .catch(err => console.log(err))
})

// Findone person by favoriteFoods
router.get('/favorite/:favoriteFoods', (req, res) => {
    const { favoriteFoods } = req.params
    Person.findOne({ favoriteFoods})
        .then(persons => res.send(persons))
        .catch(err => console.log(err))
})

// find by id 
router.get('/person/:personId', (req, res) => {
    const { personId } = req.params
    Person.findById({ _id: personId })
        .then(persons => res.send(persons))
        .catch(err => console.log(err))
})
// edit contact
router.put('/editPerson/:name', (req, res) => {
    const { name } = req.params
    Person.findOneAndUpdate({ name }, { $set: req.body })
        .then(persons => res.send(persons))
        .catch(err => console.log(err))
})
// delete person by id
router.delete('/deletePerson/:personId', (req, res) => {
    const { personId } = req.params
    Person.findByIdAndRemove({ _id : personId})
        .then(persons => res.send(persons))
        .catch(err => console.log(err))

})
// remove persons
router.delete('/delete/:name', (req, res) => {
    const { name } = req.params
    Person.remove({ name })
        .then(persons => res.send(persons))
        .catch(err => console.log(err))
})
router.get("/sort/:favoriteFoods", (req, res) => {
    const { favoriteFoods } = req.params;
    const { name } = req.params;
    Person.find({ favoriteFoods })
      .sort({ name })
      .limit(2)
      .select({age: false})
      .exec()
      .then((persons) => res.send(persons))
      .catch((err) => console.log(err))
  });
  

module.exports = router