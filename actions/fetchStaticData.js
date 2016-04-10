var StaticContentStore = require('../stores/StaticContentStore');

module.exports = function (context, payload, done) {
    var resource = payload.resource;
    var successEvent = ['RECEIVE', resource.toUpperCase(), 'SUCCESS'].join('_');
    var failureEvent = ['RECEIVE', resource.toUpperCase(), 'FAILURE'].join('_');

    var store = context.getStore(StaticContentStore);
    var data = store.getData(resource);
    if (data && Object.keys(data).length > 0) {
        // if store already has data, skip it.
        context.dispatch(successEvent, data);
        return done && done (null, data);
    }

    context.service.read('staticData', {resource: resource}, {}, (err, results) => {
        if (err) {
            context.dispatch(failureEvent);
            return done && done();
        }
        context.dispatch(successEvent, results);
        done();
    });
};
