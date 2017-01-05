var db = require('../models/api.js');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var p = db.get();
  p.then(function (data) {
    res.json({
      response: data
    });
  }, function (error) {
    res.json({
      error: error
    });
  });
});

router.post('/', function (req, res, next) {
  var p = db.post(req.body);
  p.then(function (data) {
    res.json({
      response: data
    });
  }, function (error) {
    res.json({
      error: error
    });
  });
});

router.put('/', function (req, res, next) {
  var p = db.put(req.body);
  p.then(function (data) {
    res.json({
      response: data
    });
  }, function (error) {
    res.json({
      error: error
    });
  });
});

router.delete('/', function (req, res, next) {
  var p = db.delete();
  p.then(function (data) {
    res.json({
      response: data
    });
  }, function (error) {
    res.json({
      error: error
    });
  });
});

module.exports = router;
