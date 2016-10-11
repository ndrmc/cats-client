import Ember from 'ember';

export default Ember.Controller.extend({
  dispatch:{},
  dispatchItem:{},
  dispatchItems:[],
  initDispatchItem:function(){
    this.set('dispatchItem',{
      commodityClass: null,
      commodityType: null,
      roundedAllocationMT: null,
      totalUnitsDispatched: null,
      quintalDispatched: null,
      dispatchMT: null
    });
  },
  actions:{
    createDispatch: function(){
      let newDispatch = this.store.createRecord( "dispatch", this.get('dispatch'));

      newDispatch.save().then(()=>{
        let dispatched=this.get('store').peekRecord('dispatch',newDispatch.id);
        for (var i=0; i<this.get('dispatchItems').length; i++) {
          let item=this.store.createRecord("dispatch-item",this.get('dispatchItems')[i]);
          item.set('dispatch',dispatched);
          item.save();
        }
      });
  },
  addDispatchItem: function(){
    this.get('dispatchItems').pushObject(this.get('dispatchItem'));
    this.initDispatchItem();
  }
}

});
