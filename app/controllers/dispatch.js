import Ember from 'ember';

export default Ember.Controller.extend({
  newGinFormModalOpen: false,

  actions: {
    toggleGinModalOpen: function() {
      this.toggleProperty('newGinFormModalOpen');
    }
  }
});
