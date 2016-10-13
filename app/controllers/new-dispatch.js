import Ember from 'ember';

export default Ember.Controller.extend({
  dispatch:{},
  dispatchItem:{},
  dispatchItems:[],
  months:['--select month--','January','February','March','April','May','June','July','August','September','October','November','December'],
  _stores:['--select store--','Adama steel','Adama'],
  projects:['--Choose Project--','Government/200,000','WFP/100,000'],

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
  },
  clearForm:function(){

  }
}

});
