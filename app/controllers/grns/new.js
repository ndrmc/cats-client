import Ember from 'ember';

var grnTemplate = {
  grnNumber: "",
  donor: "",
  receivedDate: "",
  project: "",
  store_: "",
  weightBridge: "",
  transporter: "",
  weightBeforeUnloading: "",
  weightAfterUnloading: "",
  plateNumber: "",
  trailerPlate: "",
  driverName: "",
  items: []
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
        commodity: "",
        batchNumber: "",
        unitOfMeasure: "",
        quantity: null,
        wayBill: "",
        grn: null
      }
    );
  },

  initGrnItemValidationErrors: function () {
    this.set( 'grnItemValidationErrors',
      {
        commodity: null,
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



  actions: {

    changeSelect: function( newValueEvt ) {
        var newValue = newValueEvt.target.value;
        var selectName = newValueEvt.target.name;

        switch (selectName) {
          case "donor":
            this.set('grn.donor', this.store.peekRecord('donor', newValue));
            break;

          case "project":
            this.set('grn.project', this.store.peekRecord('project', newValue));
            break;

          case "store":
            this.set('grn.store_', this.store.peekRecord('store', newValue));
            break;

          case "commodity":
            this.set('grnItem.commodity', this.store.peekRecord('commodity', newValue));
            break;

          default:
        }
    },


    createGRNItem: function() {
      this.initGrnItemValidationErrors();

      var attrsThatCantBeBlank = [ 'commodity', 'quantity', /* 'batchNumber', */ 'unitOfMeasure', 'wayBill' ];

      var hasValidationErrors = false;

      for( var i = 0; i < attrsThatCantBeBlank.length; i++ ) {
        if( Ember.isBlank(this.get('grnItem.' + attrsThatCantBeBlank[i] )) ) {
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

      var attrsThatCantBeBlank = [ 'grnNumber', 'donor', 'receivedDate', 'store_', 'project', 'receivedBy' ];

      var hasValidationErrors = false;

      for( var i = 0; i < attrsThatCantBeBlank.length; i++ ) {
        if( Ember.isBlank(this.get('grn.' + attrsThatCantBeBlank[i] )) ) {
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

        var grnRecord = this.store.createRecord('grn', this.get('grn'));

        grnRecord.save().then(() => {

            grnRecord.get('items').then( (grnItems) => {

              for(var i = 0; i < items.length; i++) {

                Ember.set( items[i],  'grn', this.store.peekRecord('grn', grnRecord.id));

                var grnItemRecord = this.store.createRecord( 'grn-item', items[i]);

                grnItems.pushObject(grnItemRecord);

                var grnItemPromise = grnItemRecord.save();

                itemsPromises.push( grnItemPromise );
              }

              Ember.RSVP.all( itemsPromises).then( function() {
                  grnRecord.save();
                }
              ).catch(
                () => console.log('Could not trigger resaving GRN as one or more items failed to save.')
              );

              this.clearForm();

              if( nextAction === 'REDIRECT') {
                this.transitionToRoute('grns.list');
              }
            }
            );

          });
      }
    }
  }
});
