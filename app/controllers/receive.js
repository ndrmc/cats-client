import Ember from 'ember';

export default Ember.Controller.extend({
  newGrnFormModalOpen: false,

  actions: {
    toggleModalOpen: function() {
      this.toggleProperty('newGrnFormModalOpen');
    }
  }
});
