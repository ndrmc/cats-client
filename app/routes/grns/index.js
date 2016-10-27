import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('grns.list');
  }
});
