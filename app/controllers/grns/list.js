import Ember from 'ember';
import PaginationMixin from '../../mixins/PaginationMixin';

import config from 'cats-client/config/environment';

export default Ember.Controller.extend( PaginationMixin, {

    init() {
      this._super(arguments);

      this.get('notifications').setDefaultAutoClear(true);
      this.get('notifications').setDefaultClearNotification(3000);
    },

    itemsPerPage: config.ui.paginatedListsSizePerPage,

    storeFilterId: '',

    items: Ember.computed( 'storeFilterId', 'receivedDateFilter', function() {

      if(
        Ember.isEmpty( this.get('storeFilterId')) &&
        Ember.isEmpty( this.get('receivedDateFilter') )
      ) {
        return this.get('model').grns;
      }

      var filteredList = this.get('model.grns');

      if (!Ember.isEmpty( this.get('storeFilterId'))) {
        filteredList = filteredList.filterBy( 'store_.id', this.get('storeFilterId'))
      }

      if (!Ember.isEmpty( this.get('receivedDateFilter'))) {
        filteredList = filteredList.filter((item, index, enumerable) => {
            if( !item.get('receivedDate')) return false;

            return item.get('receivedDate').toDateString() == this.get('receivedDateFilter').toDateString();
        });
      }

      return filteredList;
    }),


    actions: {
      pageChanged: function(current, previous) {
        this.set('selectedPage', current);
      },

      findGrn: function() {

        var searchInput = this.get('findByGrnInput').trim();

        if( !searchInput ) {
          this.get('notifications').error('Enter a GRN number first!');
          return;
        }

        this.store.queryRecord( 'grn', { filter: { grnNumber: searchInput}})
                  .then(
                    (grn) =>  {
                      if( grn == null ) {
                        this.get('notifications').error('No GRN found! Enter the correct number.');
                      }
                      else {
                        this.transitionToRoute('grns.show', grn.id);
                      }
                    }
                  );
      }
    }


});
