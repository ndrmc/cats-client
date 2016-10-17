import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import { Model } from 'ember-pouch';

export default Model.extend({
    commodity: belongsTo('commodity'),
    
    batchNumber: DS.attr('string'),
    unitOfMeasure: DS.attr('string'),
    quantity: DS.attr('number'),
    wayBill: DS.attr('string'),

    grn: belongsTo('grn')
});
