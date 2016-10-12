import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    this.store.createRecord('donor', { name: 'Ethiopian Government'}).save();
    this.store.createRecord('commodity', { name: 'Wheat'}).save();
    this.store.createRecord('project', { name: 'Project XYZ'}).save();
    this.store.createRecord('store_', { name: 'Adama'}).save(); 
    return [];
  }
});
