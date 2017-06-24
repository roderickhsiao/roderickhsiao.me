var createStore = require('fluxible/addons/createStore');

module.exports = createStore({
  storeName: 'StaticContentStore',
  handlers: {
    RECEIVE_ABOUT_SUCCESS: '_receiveAbout',
    RECEIVE_ACTIVITY_SUCCESS: '_receiveActivity',
    RECEIVE_CONTACT_SUCCESS: '_receiveContact',
    RECEIVE_COUNTRY_SUCCESS: '_receiveCountry',
    RECEIVE_EDUCATION_SUCCESS: '_receiveEducation',
    RECEIVE_EXPERIENCE_SUCCESS: '_receiveExperience',
    RECEIVE_MENU_SUCCESS: '_receiveMenu',
    RECEIVE_SUMMARY_SUCCESS: '_receiveSummary'
  },

  initialize: function() {
    this.about = [];
    this.activity = [];
    this.contact = [];
    this.country = {};
    this.education = [];
    this.experience = {};
    this.menu = {};
    this.summary = {};
  },

  _receiveAbout: function(payload) {
    this.about = payload;
    this.emitChange();
  },

  _receiveActivity: function(payload) {
    this.activity = payload;
    this.emitChange();
  },

  _receiveCountry: function(payload) {
    this.country = payload;
    this.emitChange();
  },

  _receiveContact: function(payload) {
    this.contact = payload;
    this.emitChange();
  },

  _receiveEducation: function(payload) {
    this.education = payload;
    this.emitChange();
  },

  _receiveExperience: function(payload) {
    this.experience = payload;
    this.emitChange();
  },

  _receiveMenu: function(payload) {
    this.menu = payload;
    this.emitChange();
  },

  _receiveSummary: function(payload) {
    this.summary = payload;
    this.emitChange();
  },

  getData: function(name) {
    return this[name] || {};
  },

  dehydrate: function() {
    return {
      about: this.about,
      activity: this.activity,
      contact: this.contact,
      country: this.country,
      education: this.education,
      experience: this.experience,
      menu: this.menu,
      summary: this.summary
    };
  },
  rehydrate: function(state) {
    this.about = state.about;
    this.activity = state.activity;
    this.contact = state.contact;
    this.country = state.country;
    this.education = state.education;
    this.experience = state.experience;
    this.menu = state.menu;
    this.summary = state.summary;
  }
});
