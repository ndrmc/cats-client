import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
export default DS.Model.extend({
  GRNNo: DS.attr(),
  receivedDate: DS.attr('date'),
  projectID: DS.attr(),
  storeName: DS.attr(),
  receivedBy: DS.attr(),
  submittedBy: DS.attr(),
  items: hasMany('receipt-item'),
  weightBridgeTicketNo: DS.attr(),
  weightBeforeUnloading: DS.attr(),
  weightAfterUnloading: DS.attr(),
  transporter: DS.attr(),
  plateNo: DS.attr(),
  trailerPlate: DS.attr(),
  driverName: DS.attr(),
  rev: DS.attr()
});
