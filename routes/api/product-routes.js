const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
      },
    ],
  })
  .then((productData) => res.json(productData))
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        },
      ],
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 // Create a new product
 router.post('/', async (req, res) => {
  try {
    const product = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIds = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIds);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update product
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rowsAffected] = await Product.update(req.body, {
      where: { id },
    });

    if (!rowsAffected) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    if (req.body.tagIds) {
      const product = await Product.findByPk(id);
      await product.setTags(req.body.tagIds);
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;

  Product.destroy({
    where: {
      id: id
    }
  })
    .then(function (rowsAffected) {
      if (!rowsAffected) {
        return res.status(404).json({
          message: 'No product found with this id'
        });
      }

      res.status(200).json({
        message: 'Product deleted successfully'
      });
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
