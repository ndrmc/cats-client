import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return{
      dispatch :this.store.find('dispatch',params.dispatchID),
      dispatchItems : this.store.query('dispatch-item', {
           filter: {
             dispatch: params.dispatchID
           }
         })

    }
  }

});
