import Ember from 'ember';

var grnItemProto = {
  commodity: "",
  batchNumber: "",
  unitOfMeasure: "",
  quantity: null,
  wayBill: "",
  grn: null
};

export default Ember.Controller.extend({

  init: function() {
    this._super( arguments );

    this.initGrnItem();
    this.initGrnItemValidationErrors();

    this.set( 'grnItems', Ember.A() ); //newly added GRN items

    this.initValidationErrors();

    this.get('notifications').setDefaultAutoClear(true);
    this.get('notifications').setDefaultClearNotification(3000);

  },

  initValidationErrors: function() {
      this.set( "validationErrors",
            {
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
              noItemsAddedError: false
            }
        );
  },

  initGrnItem: function() {
    this.set( 'grnItem', Object.assign( {},  grnItemProto) );
  },

  initGrnItemValidationErrors: function () {
    this.set( 'grnItemValidationErrors', Object.assign( {},  grnItemProto) );
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


      removeGrnItem: function(grnItem) {

        if( this.get('grn.items.length') === 1 ) {

          this.get('notifications').error("You cannot remove a GRN item when only one is left.");

          return false;
        }

        grnItem.destroyRecord();

        this.get('grn.items').then( (items) => {
          items.removeObject(grnItem);

          this.get('notifications').success('Removed!');


        });

        return false;
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

          Ember.set( this.get('grnItem'), 'grn', this.get('grn'));


          var itemRecord = this.store.createRecord('grn-item', Object.assign( {}, this.get('grnItem')) );

          this.get('grn.items').then((items) => {
            items.pushObject(itemRecord);

            itemRecord.save().then(
              () => {
                this.get('grn').save();

                this.get('notifications').success('Item Added!');
              }
            );
          });



          this.initGrnItem();
          this.initGrnItemValidationErrors();
        }

      },

      updateGRN: function() {

        this.initValidationErrors();

        var attrsThatCantBeBlank = [ 'grnNumber',  'receivedDate', 'receivedBy' ];

        var relationshipsThatCantBeBlank = [  'donor',  'store_', 'project'];

        var hasValidationErrors = false;


        for( var i = 0; i < attrsThatCantBeBlank.length; i++ ) {
          if( Ember.isBlank(this.get('grn.' + attrsThatCantBeBlank[i] )) ) {
            hasValidationErrors = true;

            this.set('validationErrors.'  + attrsThatCantBeBlank[i], "This field cannot be left blank.");
          }
        }

        for( var i = 0; i < relationshipsThatCantBeBlank.length; i++ ) {
          if( !this.get('grn').belongsTo( relationshipsThatCantBeBlank[i]).id() ) {
            hasValidationErrors = true;

            this.set('validationErrors.'  + relationshipsThatCantBeBlank[i], "This field cannot be left blank.");
          }
        }


        if( this.get('grn.items.length') === 0 ) {
          this.set('validationErrors.noItemsAddedError', true);
          hasValidationErrors = true;
        }


        if( !hasValidationErrors)  {
          this.get('grn').save().then((grn) => {
            this.get('notifications').success('Updated!');

            this.transitionToRoute('grns.show', this.get('grn').id);
          });
        }






      }

    }

});
