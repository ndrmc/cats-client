import Ember from 'ember';
import PaginationMixin from '../../mixins/PaginationMixin';

import config from 'cats-client/config/environment';

export default Ember.Controller.extend( PaginationMixin, {

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
      pageChanged(current, previous) {
        console.log( 'currnet', current);
        this.set('selectedPage', current);
      }
    }


});
