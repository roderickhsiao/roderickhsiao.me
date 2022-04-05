import StaticContentStore from '../stores/StaticContentStore';

const fetchStaticData = (context, payload, done) => {
  const { resource } = payload;
  const successEvent = ['RECEIVE', resource.toUpperCase(), 'SUCCESS'].join('_');
  const failureEvent = ['RECEIVE', resource.toUpperCase(), 'FAILURE'].join('_');

  const store = context.getStore(StaticContentStore);
  const data = store.getData(resource);
  if (data && Object.keys(data).length > 0) {
    // if store already has data, skip it.
    context.dispatch(successEvent, data);
    done?.(null, data);
    return;
  }

  context.service.read('staticData', { resource }, {}, (err, results) => {
    if (err) {
      context.dispatch(failureEvent);
      return done && done();
    }
    context.dispatch(successEvent, results);
    done();
  });
};

export default fetchStaticData;
