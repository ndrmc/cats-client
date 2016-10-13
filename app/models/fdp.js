import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
export default DS.Model.extend({
	name:DS.attr('string'),
	woreda:belongsTo('woreda'),
	rev:DS.attr('string')
});
