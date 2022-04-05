const createStore = require('fluxible/addons/createStore');

module.exports = createStore({
  storeName: 'PageStore',
  handlers: {
    RECEIVE_ASSETS_SUCCESS: '_receiveAssets'
  },

  initialize() {
    this.state = {};
  },

  _receiveAssets() {},

  dehydrate() {
    return {};
  },

  rehydrate() {}
});
