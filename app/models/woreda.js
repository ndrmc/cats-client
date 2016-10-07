import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
	name: DS.attr('string'),
	fdps:hasMany('fdp'),
	zone:belongsTo('zone')
});
