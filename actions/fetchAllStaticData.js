import parallel from 'async/parallel';

import fetchStaticDataAction from './fetchStaticData';

const fetchData = function (context, payload, done) {
  const resources = (payload?.resources?.split(',')) || [];
  const functions = resources.map(resource => callback => {
    context.executeAction(
      fetchStaticDataAction,
      {
        resource
      },
      callback
    );
  });
  
  if (!functions || !functions.length) {
    return done?.();
  }
  
  parallel(functions, done);
};

export default fetchData;
