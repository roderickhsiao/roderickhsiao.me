import parallel from 'async/parallel';
import fetchStaticDataAction from './fetchStaticData';

import {map} from 'lodash';

module.exports = function (context, payload, done) {
  var resources = payload.resources && payload.resources.split(',') || [];
  var functions = [];
  functions = map(resources, (resource) => (callback) => {
    context.executeAction(
            fetchStaticDataAction,
      {
        resource: resource
      },
            callback
        );
  });
  if (!functions || !functions.length) {
    return done && done();
  }
  parallel(functions, done);
};
