import Ember from 'ember';


export default Ember.Route.extend({
  model: function() {
    return {
      grns: this.store.findAll('grn'),
      stores: this.store.findAll('store')
    };
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('model', model);
  }
});
