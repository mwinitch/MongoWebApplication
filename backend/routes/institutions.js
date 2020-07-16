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


router.route('/update/:id').patch(async(req, res) => {
  try {
    const post = await Institution.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("An error occured while trying to update the post");
    res.status(200).json({ success: true});
  } catch(err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;