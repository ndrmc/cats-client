import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return {
       regions: this.store.findAll('region'),
       zones: this.store.findAll('zone'),
       woredas: this.store.findAll('woreda'),
       fdps: this.store.findAll('fdp')
    };
  }
});
