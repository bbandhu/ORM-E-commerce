const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', function(req, res) {
  Tag.findAll({
    include: [{ model: Product }]
  })
    .then(function(dbTagData) {
      res.json(dbTagData);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single tag by id
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((dbTagData) => res.json(dbTagData));
});

// CREATE a new tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData));
});

// UPDATE a tag
router.put('/:id', (req, res) => {
  const { id } = req.params;

  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: { id },
    }
  )
    .then((dbTagData) => {
      if (!dbTagData[0]) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a tag
router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (dbTagData === 0) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;