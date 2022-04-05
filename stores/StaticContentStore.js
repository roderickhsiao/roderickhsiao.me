const createStore = require('fluxible/addons/createStore');

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

  initialize() {
    this.about = [];
    this.activity = [];
    this.contact = [];
    this.country = {};
    this.education = [];
    this.experience = {};
    this.menu = {};
    this.summary = {};
  },

  _receiveAbout(payload) {
    this.about = payload;
    this.emitChange();
  },

  _receiveActivity(payload) {
    this.activity = payload;
    this.emitChange();
  },

  _receiveCountry(payload) {
    this.country = payload;
    this.emitChange();
  },

  _receiveContact(payload) {
    this.contact = payload;
    this.emitChange();
  },

  _receiveEducation(payload) {
    this.education = payload;
    this.emitChange();
  },

  _receiveExperience(payload) {
    this.experience = payload;
    this.emitChange();
  },

  _receiveMenu(payload) {
    this.menu = payload;
    this.emitChange();
  },

  _receiveSummary(payload) {
    this.summary = payload;
    this.emitChange();
  },

  getData(name) {
    return this[name] || {};
  },

  dehydrate() {
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
  rehydrate(state) {
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
