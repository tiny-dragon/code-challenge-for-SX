/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require('express');

const router = express.Router();
const Item = require('../model/Item');
const moment = require('moment');
const auth = require('../middleware/auth');

// /api/item call
router.get('/', auth, async (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  try {
    const user_id = req.user._id;
    const items = await Item.find({userId: user_id})
      .sort({date: 'desc'})
      .skip(pagination * page - pagination)
      .limit(pagination);
    const count = await Item.countDocuments({userId: user_id});
    let result = [];
    items.forEach(item => {
      let temp = {
        _id : item['_id'],
        productName : item['productName'],
        userId : item['userId'],
        price : item['price'],
        startDateTime : moment(item['startDateTime']).format('YYYY-MM-DD HH:mm'),
        expireDateTime : moment(item['expireDateTime']).format('YYYY-MM-DD HH:mm'),
        date : moment(item['date']).format('YYYY-MM-DD')
      };

      result.push(temp);
    });
    res.json({
      success: true,
      query: req.query,
      total: count,
      items: result,
      pages: Math.ceil(count / pagination)
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      err: message
    });
  }
});

router.post('/create', auth, async (req, res) => {
  try {
    if (!req.body._id) {
      newItem = new Item({ ...req.body });
      console.log("Create New Item: ", newItem);
      await newItem.save();
      res.json({
        success: true,
        message: 'item create'
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: err
    });
  }
});

router.get('/:_id', auth, async (req, res) => {
  const { _id } = req.params;
  try {
    const itemFond = await Item.findOne({
      _id: _id
    });
    if (!itemFond) {
      res.json({
        success: false,
        message: `item not fond (${_id})`
      });
    } else {
      res.json({
        success: true,
        message: `Location fond `,
        item: itemFond
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      err: err
    });
  }
});

router.post('/update', auth, async (req, res) => {
  const { _id, productName, price, userId, image, startDateTime, expireDateTime } = req.body;
  try {
    const item = await Item.findOne({
      _id : _id
    });

    if (!item) {
      res.json({
        success: false,
        message: `item not fond (${_id})`
      });
    } else {
      if (productName) item.productName = productName;
      if (price) item.price = price;
      if (userId) item.userId = userId;
      if (image) item.image = image;
      if (startDateTime) item.startDateTime = startDateTime;
      if (expireDateTime) item.expireDateTime = expireDateTime;
      
      await item.save();
      res.json({
        success: true,
        message: `item Updated `,
        item: item
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: err
    });
  }
});

router.post('/delete', auth, async (req, res) => {
  const { _id } = req.body;
  try {
    const resolve = await Item.deleteOne({ _id: _id });
    if (resolve.deletedCount === 1) {
      res.json({
        success: true,
        message: 'done',
        data: resolve
      });
    } else {
      res.json({
        success: false,
        message: 'not fond',
        data: resolve
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      err: err
    });
  }
});

module.exports = router;
