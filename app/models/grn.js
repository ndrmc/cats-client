import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import { Model } from 'ember-pouch';

export default Model.extend({
    grnNumber: DS.attr('string'),
    donorId: DS.attr('string'),
    receivedDate: DS.attr('date'),
    projectId: DS.attr('string'),
    storeId: DS.attr('string'),
    receivedBy: DS.attr('string'),
    submittedBy: DS.attr('string'),
    weightBridge: DS.attr('string'),
    weightBeforeUnloading: DS.attr('number'),
    weightAfterUnloading: DS.attr('number'),
    transporter: DS.attr('string'),
    plateNumber: DS.attr('string'),
    trailerPlate: DS.attr('string'),
    driverName: DS.attr('string'),

    items: hasMany('grnItem', { inverse: 'grn' })
});
