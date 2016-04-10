var StaticContentStore = require('../stores/StaticContentStore');

module.exports = function (context, payload, done) {
    var resource = payload.resource;
    var successEvent = ['RECEIVE', resource.toUpperCase(), 'SUCCESS'].join('_');
    var failureEvent = ['RECEIVE', resource.toUpperCase(), 'FAILURE'].join('_');

    context.service.read('staticData', {resource: resource}, {}, function (err, todos) {
        var store = context.getStore(StaticContentStore);
        var data = store.getData(resource);
        if (data) {
            // if store already has data, skip it.
            context.dispatch(successEvent, data);
            return done && done (null, data);
        }

        if (err) {
            context.dispatch(failureEvent, payload);
            return done && done();
        }
        context.dispatch(successEvent, payload);
        done();
    });
};
