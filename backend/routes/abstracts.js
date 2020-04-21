const router = require('express').Router();
let Abstract = require('../models/abstracts.model');

router.route('/').get((req, res) => {
  Abstract.find()
    .then(abstract => res.json(abstract))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/first/').get((req, res) => {
    Abstract.findOne({
        estado: false
     })
     .then(abstract => res.json(abstract))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const input_url = req.body.input_url;
    const texto = req.body.texto;
    const tipo = req.body.tipo;
    const corriente = req.body.corriente;
    const estado = req.body.estado;
    const newAbstract = new Abstract({
        input_url,
        texto,
        tipo,
        corriente,
        estado
    });
    newAbstract.save()
    .then(() => res.json('Abstract added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Abstract.findById(req.params.id)
      .then(abstract => res.json(abstract))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/delete/:id').get((req, res) => {
Abstract.findByIdAndDelete(req.params.id)
    .then(() => res.json('Abstract deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
Abstract.findById(req.params.id)
    .then(abstract => {
    abstract.input_url = req.body.input_url;
    abstract.texto = req.body.texto;
    abstract.tipo = req.body.tipo;
    abstract.corriente = req.body.corriente;
    abstract.estado = req.body.estado;
    abstract.save()
        .then(() => res.json('Abstract updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/anotar/:id').post((req, res) => {
    Abstract.findById(req.params.id)
        .then(abstract => {
        abstract.tipo = req.body.tipo;
        abstract.corriente = req.body.corriente;
        abstract.estado = true;
        abstract.save()
            .then(() => res.json('Abstract anotated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/desanotar/:id').get((req, res) => {
    Abstract.findById(req.params.id)
        .then(abstract => {
        abstract.tipo = "";
        abstract.corriente = "";
        abstract.estado = false;
        abstract.save()
            .then(() => res.json('Abstract desanotated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
    
module.exports = router;