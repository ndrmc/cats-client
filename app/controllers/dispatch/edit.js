import Ember from 'ember';

export default Ember.Controller.extend({

  months:['--select month--','January','February','March','April','May','June','July','August','September','October','November','December'],
  _stores:['--select store--','Adama steel','Adama'],
  projects:['--Choose Project--','Government/200,000','WFP/100,000'],
  zonesInRegion:[],
  woredasInZone:[],
  fdpsInWoreda:[],
  actions:{
      saveDispatch: function(){

      this.get('dispatch').save().then(function(dispatch){
        console.log(dispatch);
        for (var i=0; i<this.get('model').dispatchItems.length; i++) {
          let item=this.store.createRecord("dispatch-item",this.get('model').dispatchItems[i]);
          item.set('dispatch',dispatch);
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

   this.get('store').query('zone', {
        filter: {
          region: region
        }
      }).then((zones)=>{
        console.log("zones----",zones);
        for(var zi=0;zi<zones.get('content').length;zi++){

          if(Object.keys(zones.get('content')[zi]._data).length!==0){
            this.get('zonesInRegion').pushObject(zones.get('content')[zi]);
          }
        }
          console.log('****zonesInRegion*****',this.zonesInRegion);
      });

    this.get('dispatch').region=r;

  },
  zoneSelected:function(zone){
    let z=this.get('store').peekRecord('zone',zone);
    this.get('woredasInZone').length=0;
    this.get('store').query('woreda', {
        filter: {
          zone: zone
        }
      }).then((woredas)=>{

        for(var wi=0;wi<woredas.get('content').length;wi++){
          if(Object.keys(woredas.get('content')[wi]._data).length!==0){
            this.get('woredasInZone').pushObject(woredas.get('content')[wi]);
          }
        }
      });

      this.get('dispatch').zone=z;

  },
  woredaSelected:function(woreda){
    let w=this.get('store').peekRecord('woreda',woreda);
    this.get('fdpsInWoreda').length=0;
    var that=this;
    this.get('store').query('fdp', {
        filter: {
          woreda: woreda
        }
      }).then((fdps)=>{
        for(var fi=0;fi<fdps.get('content').length;fi++){
          if(Object.keys(fdps.get('content')[fi]._data).length!==0){
            that.get('fdpsInWoreda').pushObject(fdps.get('content')[fi]);
          }
        }
      });
      this.get('dispatch').woreda=w;

  },
  fdpSelected:function(fdp){
    let f=this.get('store').peekRecord('fdp',fdp);
    this.get('dispatch').fdp=f;

  }
}

});
