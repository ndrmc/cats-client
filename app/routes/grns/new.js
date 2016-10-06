import Ember from 'ember';

import { UOM_MT, UOM_KG } from '../../config/consts';


export default Ember.Route.extend({
  model: function() {
    return {
      unitOfMeasures: [UOM_MT, UOM_KG]
    };
  }
});
