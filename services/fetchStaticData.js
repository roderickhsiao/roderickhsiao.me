import about from '../data/about';
import activity from '../data/activity';
import component from '../configs/components';
import contact from '../data/contact';
import country from '../data/country';
import education from '../data/education';
import experience from '../data/experience';
import layout from '../configs/layout';
import menu from '../data/menu';
import summary from '../data/summary';

const DATA_MAPPING = {
  about,
  activity,
  component,
  contact,
  country,
  education,
  experience,
  layout,
  menu,
  summary,
};

export default {
  resource: 'staticData',
  read(req, resource, params, config, callback) {
    const data = DATA_MAPPING[params.resource];
    if (!data) {
      callback(new Error(`No data returns for resource: ${resource}`));
    }
    callback(null, data);
  },
};
