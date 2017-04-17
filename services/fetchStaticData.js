var DATA_MAPPING = {
  about: require('../data/about'),
  activity: require('../data/activity'),
  component: require('../configs/components'),
  contact: require('../data/contact'),
  country: require('../data/country'),
  education: require('../data/education'),
  experience: require('../data/experience'),
  interest: require('../data/interest'),
  layout: require('../configs/layout'),
  menu: require('../data/menu'),
  summary: require('../data/summary')
};

var fumble = require('fumble');

module.exports = {
  name: 'staticData',
  read: function (req, resource, params, config, callback) {
    var data = DATA_MAPPING[params.resource];
    if (!data) {
      callback(fumble.http.internalServerError('No data returns for resource: ' + resource));
    }
    callback(null, data);
  }
}
