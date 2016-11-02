import DS from 'ember-data';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { Model } from 'ember-pouch';
import BaseDomain from '../mixins/BaseDomain';

export default Model.extend(BaseDomain, {
    grnNumber: DS.attr('string'),
    donor: belongsTo('donor'),
    receivedDate: DS.attr('date'),
    project: belongsTo('project'),
    store_: belongsTo('store'),
    receivedBy: DS.attr('string'),
    submittedBy: DS.attr('string'),
    weightBridge: DS.attr('string'),
    weightBeforeUnloading: DS.attr('number'),
    weightAfterUnloading: DS.attr('number'),
    transporter: DS.attr('string'),
    plateNumber: DS.attr('string'),
    trailerPlate: DS.attr('string'),
    driverName: DS.attr('string'),

    items: hasMany('grn-item')
});
