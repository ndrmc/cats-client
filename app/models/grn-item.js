import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import { Model } from 'ember-pouch';

export default Model.extend({
    commodityId: DS.attr('string'),
    batchNumber: DS.attr('string'),
    unitOfMeasure: DS.attr('string'),
    quantity: DS.attr('number'),
    wayBill: DS.attr('string'),
    
    grn: belongsTo('grn')
});
