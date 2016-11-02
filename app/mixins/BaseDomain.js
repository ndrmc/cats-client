import Ember from 'ember';
import DS from 'ember-data';


export default Ember.Mixin.create({
  dateCreated: DS.attr('on-create-timestamp'),
  lastUpdated: DS.attr('on-update-timestamp')
}); 
