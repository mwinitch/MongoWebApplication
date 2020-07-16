const router = require('express').Router();
let Institution = require('../models/institution.model');

router.route('/').get((req, res) => {
    Institution.find()
        .then(insti => res.json(insti))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Institution.findById(req.params.id)
      .then(institute => res.json(institute))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const city = req.body.city;
    const country = req.body.country;
    const newInstitution = new Institution({name, city, country});
    newInstitution.save()
        .then((item) => res.json(item))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) => {
    Institution.findById(req.params.id)
      .then(institute => {
        institute.name = req.body.name;
        institute.city = req.body.city;
        institute.country = req.body.country;
  
        institute.save()
          .then(() => res.json('Institute has been updated'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;