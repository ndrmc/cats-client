import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import { Model } from 'ember-pouch';

export default Model.extend({
    name: DS.attr('string'),
    active: DS.attr('boolean', { defaultValue: true})
});
