import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
export default DS.Model.extend({
    grnNo: DS.attr('string'),
    receivedDate: DS.attr('date'),
    projectId: DS.attr('string'),
    storeName: DS.attr('string'),
    receivedBy: DS.attr('string'),
    submittedBy: DS.attr('string'),
    items: hasMany('receipt-item'),
    weightBridgeTicketNo: DS.attr('string'),
    weightBeforeUnloading: DS.attr('number'),
    weightAfterUnloading: DS.attr('number'),
    transporter: DS.attr('string'),
    plateNo: DS.attr('string'),
    trailerPlate: DS.attr('string'),
    driverName: DS.attr('string'),
    rev: DS.attr('string')
});