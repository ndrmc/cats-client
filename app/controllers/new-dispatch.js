import Ember from 'ember';

export default Ember.Controller.extend({
  dispatch:{},
  actions:{
    createDispatch: function(){
      var newDispatch = this.store.createRecord( "dispatch", this.get('dispatch'));
      newDispatch.save();
  }
}

});
