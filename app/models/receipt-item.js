import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  rev: DS.attr(),
  commodity: DS.attr('string'),
  batch: DS.attr('string'),
  UOM: DS.attr('string'),
  quantity: DS.attr('string'),
  waybill: DS.attr('string'),
  receive: belongsTo('receive')
});
