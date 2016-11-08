import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return{
      dispatch :this.store.findRecord('dispatch',params.dispatch_edit_id),
      dispatchItems : this.store.query('dispatch-item', {
           filter: {
             dispatch: params.dispatch_edit_id
           }
         }),
      regions: this.store.findAll('region')

    };
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    model.dispatch.then( (dispatch) => {
      controller.set( 'dispatch', dispatch);

    });

    model.dispatchItems.then((dispatchItems)=>{
      controller.set('dispatchItems',dispatchItems);
    })

}

});
