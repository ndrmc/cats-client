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
          region: region
        }
      }).then(function(zones){
        that.get('zonesInRegion').pushObjects(zones.get('content'));

        console.log("zonesInRegion",that.get('zonesInRegion'));
      });

    this.get('newDispatch').region=r;
  console.log("zones",zones);
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
        that.get('woredasInZone').pushObjects(woredas.get('content'));
        console.log("woredas",that.get('woredasInZone'));
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
        that.get('fdpsInWoreda').pushObjects(fdps.get('content'));
        console.log("fdps",that.get('fdpsInWoreda'));
      });
      this.get('newDispatch').woreda=w;

  },
  fdpSelected:function(fdp){
    let f=this.get('store').peekRecord('fdp',fdp);
    this.get('newDispatch').fdp=f;

  }
}

});
