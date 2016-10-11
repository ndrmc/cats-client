import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  commodityClass: DS.attr('string'),
  commodityType: DS.attr('string'),
  roundedAllocationMT: DS.attr('number'),
  totalUnitsDispatched: DS.attr('number'),
  quintalDispatched: DS.attr('number'),
  dispatchMT: DS.attr('number'),
  dispatch: belongsTo('dispatch'),
  rev: DS.attr('string')
});
