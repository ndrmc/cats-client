import Ember from 'ember';

import { UOM_MT, UOM_KG } from '../../config/consts';


export default Ember.Route.extend({
  model: function() {
    return {
      unitOfMeasures: [UOM_MT, UOM_KG],
      
      stores: this.store.findAll('store'),
      commodities: this.store.findAll('commodity'),
      projects: this.store.findAll('project'),
      donors: this.store.findAll('donor')
    };
  }
});
