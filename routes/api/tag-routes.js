const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags -- check for accuracy
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      // include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }).then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});
  // find a single tag by its `id` -- check for accuracy
  // be sure to include its associated Product data
//   try {
//     const tagData = await Tag.findByPk(req.params.id, {
//       // include: [{ model: Product }],
//     });

//     if (!tagData) {
//       res.status(404).json({ message: 'No tag found with that id!' });
//       return;
//     }

//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post('/', async (req, res) => {
  // create a new tag -- check for accuracy
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    }
  }).then((updateTag) => {
    res.json(updateTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value -- check for accuracy
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;