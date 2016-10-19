import Ember from 'ember';
import PaginationMixin from '../../mixins/PaginationMixin';

import config from 'cats-client/config/environment';

export default Ember.Controller.extend( PaginationMixin, {
  
    itemsPerPage: config.ui.paginatedListsSizePerPage,

    storeFilterId: '',

    items: Ember.computed( 'storeFilterId', function() {

      if( Ember.isEmpty( this.get('storeFilterId'))) {
        return this.get('model').grns;
      }

      return this.get('model').grns.filterBy( 'store_.id', this.get('storeFilterId'));
    }),


    actions: {
      pageChanged(current, previous) {
        console.log( 'currnet', current);
        this.set('selectedPage', current);
      }
    }


});
