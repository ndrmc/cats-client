import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    rev: DS.attr('string'),
    commodity: DS.attr('string'),
    batch: DS.attr('string'),
    uom: DS.attr('string'),
    quantity: DS.attr('number'),
    waybill: DS.attr('string'),
    receipt: belongsTo('receipt')
});