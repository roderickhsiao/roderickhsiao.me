var createStore = require('fluxible/addons/createStore');

module.exports = createStore({
  storeName: 'PageStore',
  handlers: {
    RECEIVE_ASSETS_SUCCESS: '_receiveAssets'
  },

  initialize: function() {
    this.state = {};
  },

  _receiveAssets: function(payload) {},

  dehydrate: function() {
    return {};
  },

  rehydrate: function(state) {}
});
