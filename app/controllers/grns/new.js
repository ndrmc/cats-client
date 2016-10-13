import Ember from 'ember';

import { UOM_MT, UOM_KG } from '../../config/consts';


var grnTemplate = {
  grnNumber: "",
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
  driverName: "",
  items: []
};

var newGrnItemProto = {
  commodityId: null,
  batchNumber: "",
  unitOfMeasure: "",
  quantity: null,
  wayBill: ""
};

export default Ember.Controller.extend({

  init() {
    this.clearForm();
  },

  clearForm() {
    this.initReceipt();
    this.initValidationErrors();

    this.initGrnItem();
    this.initGrnItemValidationErrors();

    this.set('grnItems', Ember.A());
  },

  initGrnItem: function () {
    this.set( 'grnItem',
      {
        commodityId: null,
        batchNumber: "",
        unitOfMeasure: "",
        quantity: null,
        wayBill: ""
      }
    );
  },

  initGrnItemValidationErrors: function () {
    this.set( 'grnItemValidationErrors',
      {
        commodityId: null,
        batchNumber: "",
        unitOfMeasure: "",
        quantity: null,
        wayBill: ""
      }
    );
  },

  initReceipt: function() {
    this.set('grn', Object.assign( {}, grnTemplate));
  },

  initValidationErrors: function() {
    this.set("validationErrors", Object.assign( {}, grnTemplate, { noItemsAddedError: false}));
  },

  lookups: {
    donors: [{ _id: '1', name: "Ethiopian Government"}],
    stores: [{ _id: '1', name: "Adama"}],
    projects: [{ _id: '1', name: "Project 1"}],
    commodities: [{ _id: '1', name: "Wheat"}]
  },


  actions: {

    createGRNItem: function() {
      this.initGrnItemValidationErrors();

      var attrsThatCantBeBlank = [ 'commodityId', 'quantity', /* 'batchNumber', */ 'unitOfMeasure', 'wayBill' ];

      var hasValidationErrors = false;

      for( var i = 0; i < attrsThatCantBeBlank.length; i++ ) {
        if( Ember.isEmpty(this.get('grnItem.' + attrsThatCantBeBlank[i] )) ) {
          hasValidationErrors = true;

          this.set('grnItemValidationErrors.'  + attrsThatCantBeBlank[i], "This field cannot be left blank.");
        }
      }

      if( hasValidationErrors ) {
        return false;
      }
      else {
        this.get('grnItems').pushObject( this.get('grnItem') );

        this.initGrnItem();
        this.initGrnItemValidationErrors();
      }


    },

    createGRN: function(nextAction) {
      this.initValidationErrors();

      var attrsThatCantBeBlank = [ 'grnNumber', 'donorId', 'receivedDate', 'storeId', 'projectId', 'receivedBy' ];

      var hasValidationErrors = false;

      for( var i = 0; i < attrsThatCantBeBlank.length; i++ ) {
        if( Ember.isEmpty(this.get('grn.' + attrsThatCantBeBlank[i] )) ) {
          hasValidationErrors = true;

          this.set('validationErrors.'  + attrsThatCantBeBlank[i], "This field cannot be left blank.");
        }
      }

      if( this.get('grnItems').length === 0 ) {
        this.set('validationErrors.noItemsAddedError', true);
        hasValidationErrors = true;
      }


      if( hasValidationErrors ) {
        return false;
      }
      else {

        var items = this.get('grnItems');

        var itemsPromises = [];

        var grnRecord = this.store.createRecord( 'grn', this.get('grn'));

        grnRecord.save().then(() => {
          var grnItems = grnRecord.get('items').then(  (grnItems) => {

            for (var i = 0; i < items.length; i++) {
              var grnItemRecord = this.store.createRecord( 'grnItem',items[i]);

              grnItems.pushObject(grnItemRecord);

              itemsPromises.push( grnItemRecord.save());
            }


            Ember.RSVP.all( itemsPromises).then( function() {

                console.log("Resaving the GRN");

                this.store.createRecord( 'grn', this.get('grn')).save();
              }
            ).catch(() => console.log('saving grn failed!'));

            this.clearForm();

            if( nextAction === 'REDIRECT') {
              this.transitionToRoute('grns.list');
            }

          });

        });

      }
    }
  }
});
