import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import { Model } from 'ember-pouch';
import BaseDomain from '../mixins/BaseDomain';


export default Model.extend(BaseDomain, {
    commodity: belongsTo('commodity'),

    batchNumber: DS.attr('string'),
    unitOfMeasure: DS.attr('string'),
    quantity: DS.attr('number'),
    wayBill: DS.attr('string'),

    grn: belongsTo('grn')
});
