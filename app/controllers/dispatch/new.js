import Ember from 'ember';

export default Ember.Controller.extend({
  newDispatch:{},
  newDispatchItem:{},
  newDispatchItems:[],
  months:['--select month--','January','February','March','April','May','June','July','August','September','October','November','December'],
  _stores:['--select store--','Adama steel','Adama'],
  projects:['--Choose Project--','Government/200,000','WFP/100,000'],
  zonesInRegion:[],
  woredasInZone:[],
  fdpsInWoreda:[],
  initDispatchItem:function(){
    this.set('newDispatchItem',{
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

      let newDispatch = this.store.createRecord( "dispatch", this.get('newDispatch'));
      debugger;

      newDispatch.save().then(()=>{
        console.log("items*************",this.get('newDispatchItems').length);
        let dispatched=this.store.peekRecord('dispatch',newDispatch.id);
        console.log("dispatched*************",dispatched);

        for (var i=0; i<this.get('newDispatchItems').length; i++) {
          let item=this.store.createRecord("dispatch-item",this.get('newDispatchItems')[i]);
          item.set('dispatch',dispatched);
          item.save();
        }
      });

      this.transitionToRoute('dispatch.list');

  },
  addDispatchItem: function(){
    this.get('newDispatchItems').pushObject(this.get('newDispatchItem'));
    this.initDispatchItem();
  },
  clearForm:function(){

  },
  regionSelected:function(region){

   let r=this.get('store').peekRecord('region',region);
    this.get('zonesInRegion').length=0;
    var that=this;
    debugger;
   var zones=this.get('store').query('zone', {
        filter: {
          region: region,

        }
      }).then(function(zones){
        for(var zi=0;zi<zones.get('content').length;zi++){
          if(Object.keys(zones.get('content')[zi]._data).length!=0){
            that.get('zonesInRegion').pushObject(zones.get('content')[zi]);
          }
        }
      });

    this.get('newDispatch').region=r;

  },
  zoneSelected:function(zone){
    let z=this.get('store').peekRecord('zone',zone);
    this.get('woredasInZone').length=0;
    var that=this;
    var woredas=this.get('store').query('woreda', {
        filter: {
          zone: zone
        }
      }).then(function(woredas){
        for(var wi=0;wi<woredas.get('content').length;wi++){
          if(Object.keys(woredas.get('content')[wi]._data).length!=0){
            that.get('woredasInZone').pushObject(woredas.get('content')[wi]);
          }
        }
      });

      this.get('newDispatch').zone=z;

  },
  woredaSelected:function(woreda){
    let w=this.get('store').peekRecord('woreda',woreda);
    this.get('fdpsInWoreda').length=0;
    var that=this;
    var fdps=this.get('store').query('fdp', {
        filter: {
          woreda: woreda
        }
      }).then(function(fdps){
        for(var fi=0;fi<fdps.get('content').length;fi++){
          if(Object.keys(fdps.get('content')[fi]._data).length!=0){
            that.get('fdpsInWoreda').pushObject(fdps.get('content')[fi]);
          }
        }
      });
      this.get('newDispatch').woreda=w;

  },
  fdpSelected:function(fdp){
    let f=this.get('store').peekRecord('fdp',fdp);
    this.get('newDispatch').fdp=f;

  }
}

});
