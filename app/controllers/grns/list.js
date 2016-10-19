import Ember from 'ember';
import PaginationMixin from '../../mixins/PaginationMixin';


export default Ember.Controller.extend( PaginationMixin, {
    itemsPerPage: 8,

  actions: {
  pageChanged(current, previous) {
    console.log( 'currnet', current);
    this.set('selectedPage', current);
  }
}


});
