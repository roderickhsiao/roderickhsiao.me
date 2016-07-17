import parallel from 'async/parallel';
import fetchStaticDataAction from './fetchStaticData';

import {forEach} from 'lodash';

module.exports = function (context, payload, done) {
    var resources = payload.resources && payload.resources.split(',') || [];
    var functions = [];
    forEach(resources, (resource) => {
        functions.push((callback) => {
            context.executeAction(
                fetchStaticDataAction,
                {
                    resource: resource
                },
                callback
            );
        });
    });
    if (!functions || !functions.length) {
        return done && done();
    }
    parallel(functions, () => {
        done && done();
    });
};
