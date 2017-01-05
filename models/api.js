var settings = require('../settings.json');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(settings.DB_HOST);

var itemSchema = new Schema({
  name:  String,
  data: Schema.Types.Mixed
});

var Item = mongoose.model('Item', itemSchema);

var api = {
  get: function (name) {
    return new Promise(function (resolve, reject) {
      var query = name ? { name: name } : {};

      Item.find(query, 'name data', function (error, item) {
        if (error) {
          console.error('Error:', error);
          reject('Item: ' + name + ' not found');
          return;
        }

        resolve(item);
      });
    });
  },
  post: function (body) {
    return new Promise(function (resolve, reject) {
      if (typeof body.name === 'undefined'
          || typeof body.data === 'undefined'
      ) {
        reject('Invalid request payload.');
        return;
      }

      var item = new Item({
        name: body.name,
        data: body.data
      });
      item.save(function (error, item) {
        if (error) {
          console.error('Error:', error);
          reject('Item: ' + item.name + ' not saved.');
          return;
        }

        resolve(item);
      });
    });
  },
  put: function (body) {
    return new Promise(function (resolve, reject) {
      if (!body instanceof Array) {
        reject('Invalid request payload.');
        return;
      }

      var data = [];
      body.forEach(function (item) {
        if (typeof item.name === 'undefined'
            || typeof item.data === 'undefined'
        ) {
          return;
        }

        data.push({
          name: item.name,
          data: item.data
        });
      });

      Item.remove({}, function (error) {
        if (error) {
          console.error('Error:', error);
          reject('Error dropping collection.');
          return;
        }

        var items = Item.create(data, function (error) {
          var args = [].slice.call(arguments);

          if (error) {
            console.error('Error:', error);
            reject('Items not saved.');
            return;
          }

          resolve(args[1]);
        });
      });
    });
  },
  delete: function (name) {
    return new Promise(function (resolve, reject) {
      var query = name ? { name: name } : {};

      Item.find(query).remove(function (error, item) {
        if (error) {
          console.error('Error:', error);
          reject('Item: ' + name + ' not found');
          return;
        }

        resolve('Collection deleted.');
      });
    });
  }
};

module.exports = api;
