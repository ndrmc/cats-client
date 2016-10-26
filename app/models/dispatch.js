import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import { belongsTo } from 'ember-data/relationships';
export default DS.Model.extend({
    gin: DS.attr('number'),
    requisitionNo: DS.attr('number'),
    roundNo: DS.attr('string'),
    region: belongsTo('region'),
    zone: belongsTo('zone'),
    woreda: belongsTo('woreda'),
    fdp:belongsTo('fdp'),
    transporter:DS.attr('string'),
    driverName:DS.attr('string'),
    plateNo: DS.attr('string'),
    trailerNo: DS.attr('string'),
    dispatchMonth: DS.attr('string'),
    dispatchDate: DS.attr('date'),
    projectCode: DS.attr('string'),
    siCode: DS.attr('string'),
    allocationPeriod: DS.attr('string'),
    _store:DS.attr('string'),
    storeKeeper: DS.attr('string'),
    enteredBy: DS.attr('string'),
    items:hasMany('dispatch-item'),
    rev: DS.attr('string')

});
