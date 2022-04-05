import parallel from 'async/parallel';

import fetchStaticDataAction from './fetchStaticData';

const fetchData = function (context, payload, done) {
  const resources = (payload.resources && payload.resources.split(',')) || [];
  let functions = [];
  functions = resources.map(resource => callback => {
    context.executeAction(
      fetchStaticDataAction,
      {
        resource
      },
      callback
    );
  });
  if (!functions || !functions.length) {
    return done && done();
  }
  parallel(functions, done);
};

export default fetchData;
