import Ember from 'ember';

export default Ember.Controller.extend({
  dispatch:{},
  dispatchItem:{},
  dispatchItems:[],
  months:['--select month--','January','February','March','April','May','June','July','August','September','October','November','December'],
  _stores:['--select store--','Adama steel','Adama'],
  projects:['--Choose Project--','Government/200,000','WFP/100,000'],
  zonesInRegion:[],
  woredasInZone:[],
  fdpsInWoreda:[],
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

  },
  regionSelected:function(region){
    this.get('zonesInRegion').length=0;
    var that=this;
    var zones=this.get('store').query('zone', {
        filter: {
          region: region
        }
      }).then(function(zones){
        that.get('zonesInRegion').pushObjects(zones.get('content'));
        console.log("zonesInRegion",that.get('zonesInRegion'));
      });


  },
  zoneSelected:function(zone){
    this.get('woredasInZone').length=0;
    var that=this;
    var woredas=this.get('store').query('woreda', {
        filter: {
          zone: zone
        }
      }).then(function(woredas){
        that.get('woredasInZone').pushObjects(woredas.get('content'));
        console.log("woredas",that.get('woredasInZone'));
      });


  },
  woredaSelected:function(woreda){
    this.get('fdpsInWoreda').length=0;
    var that=this;
    var fdps=this.get('store').query('fdp', {
        filter: {
          woreda: woreda
        }
      }).then(function(fdps){
        that.get('fdpsInWoreda').pushObjects(fdps.get('content'));
        console.log("fdps",that.get('fdpsInWoreda'));
      });


  }
}

});
