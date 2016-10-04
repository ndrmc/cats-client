import DS from 'ember-data';

export default DS.Model.extend({
    gin: DS.attr('number'),
    requisitionNo: DS.attr('number'),
    roundNo: DS.attr('string'),
    region: DS.attr('string'),
    zone: DS.attr('string'),
    woreda: DS.attr('string'),
    fdp: DS.attr('string'),
    transporter:DS.attr('string'),
    PlateNo: DS.attr('string'),
    trailerNo: DS.attr('string'),
    dispatchDate: DS.attr('date'),
    projectCode: DS.attr('string'),
    siCode: DS.attr('string'),
    commodityClass: DS.attr('string'),
    commodityType: DS.attr('string'),
    roundedAllocationMT: DS.attr('number'),
    totalUnitsDispatched: DS.attr('number'),
    quintalDispatched: DS.attr('number'),
    dispatchMT: DS.attr('number'),
    balance: DS.attr('number'),
    allocationPeriod: DS.attr('string'),
    storeKeeper: DS.attr('string'),
    enteredBy: DS.attr('string'),
    rev: DS.attr('string')

});
