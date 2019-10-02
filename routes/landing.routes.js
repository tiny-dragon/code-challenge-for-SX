const express = require('express');

const router = express.Router();
const Item = require('../model/Item');
const moment = require('moment');

// /api/landing call
router.get('/', async (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    try {
      const items = await Item.find({})
        .sort({date: 'desc'})
        .skip(pagination * page - pagination)
        .limit(pagination);
      const count = await Item.countDocuments({});
      let result = [];
      items.forEach(item => {
        let temp = {
          _id : item['_id'],
          productName : item['productName'],
          image : item['image'],
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
  
  module.exports = router;
  