import Ember from 'ember';

var receiptTemplate = {
  grn: "",
  donorId: "",
  receivedDate: "",
  projectId: "",
  storeId: "",
  weightBridge: "",
  transporter: "",
  weightBeforeUnloading: "",
  weightAfterUnloading: "",
  plateNumber: "",
  trailerPlate: "",
  driverName: ""
};

var newReceiptItemProto = {
  commodityId: null,
  batchNumber: "",
  unitOfMeasure: "",
  quantity: null,
  wayBill: ""
}; 

export default Ember.Controller.extend({

  init() {
    this.initReceipt();
    this.initValidationErrors();


    this.set( 'newReceiptItem',
      {
        commodityId: null,
        batchNumber: "",
        unitOfMeasure: "",
        quantity: null,


      }
    );
  },

  initReceipt: function() {
    this.set('receipt', Object.assign( {}, receiptTemplate));
  },

  initValidationErrors: function() {
    this.set("validationErrors", Object.assign( {}, receiptTemplate));
  },

  lookups: {
    donors: [{ _id: '1', name: "Ethiopian Government"}],
    stores: [{ _id: '1', name: "Adama"}],
    projects: [{ _id: '1', name: "Project 1"}]
  },

  newGrnFormModalOpen: false,



  actions: {
    toggleModalOpen: function() {
      this.toggleProperty('newGrnFormModalOpen');
    },

    createGRN: function() {

      this.initValidationErrors();

      var attrsThatCantBeBlank = [ 'grn', 'donorId', 'receivedDate', 'storeId', 'projectId', 'receivedBy' ];

      var hasValidationErrors = false;

      for( var i = 0; i < attrsThatCantBeBlank.length; i++ ) {
        if( Ember.isEmpty(this.get('receipt.' + attrsThatCantBeBlank[i] )) ) {
          hasValidationErrors = true;

          this.set('validationErrors.'  + attrsThatCantBeBlank[i], "This field cannot be left blank.");
        }
      }


      if( hasValidationErrors ) {
        return;
      }
      else {

      }
    }
  }
});
