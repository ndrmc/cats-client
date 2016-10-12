import Ember from 'ember';


export default Ember.Route.extend({
  model: function() {
    return {
      grns: this.store.findAll('grn')
    };
  }
});
