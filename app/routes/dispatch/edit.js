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
      regions: this.store.findAll('region'),
      zonesInRegion:[],
      woredasInZone:[],
      fdpsInWoreda:[]
    };
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    debugger;
    model.dispatch.then( (dispatch) => {
      controller.set( 'dispatch', dispatch);
      console.log("----dispatch is--",dispatch);
      console.log("----region is--",dispatch.get('region').get('id'));

    this.store.query('zone',{
        filter:{
          region:dispatch.get('region').get('id')
        }
      }).then((zones)=>{
        var zonesByRegion=[];
        for(var zi=0;zi<zones.get('content').length;zi++){
          if(Object.keys(zones.get('content')[zi]._data).length!==0){
            zonesByRegion.pushObject(zones.get('content')[zi]);
          }
        }
        console.log('zonesByRegion',zonesByRegion);
      controller.set('zonesInRegion',zonesByRegion);
      });

      this.store.query('woreda',{
          filter:{
            zone:dispatch.get('zone').get('id')
          }
        }).then((woredas)=>{
          var woredasByZone=[];
          for(var w=0;w<woredas.get('content').length;w++){
            if(Object.keys(woredas.get('content')[w]._data).length!==0){
              woredasByZone.pushObject(woredas.get('content')[w]);
            }
          }
        console.log('woredasByZone',woredasByZone);
        controller.set('woredasInZone',woredasByZone);
        });

        this.store.query('fdp',{
            filter:{
              woreda:dispatch.get('woreda').get('id')
            }
          }).then((fdps)=>{
            var fdpsByWoreda=[];
            for(var f=0;f<fdps.get('content').length;f++){
              if(Object.keys(fdps.get('content')[f]._data).length!==0){
                fdpsByWoreda.pushObject(fdps.get('content')[f]);
              }
            }
          console.log('fdpsByWoreda',fdpsByWoreda);
          controller.set('fdpsInWoreda',fdpsByWoreda);
          });
    });


      /*model.region.then((region)=>{

    controller.set('zonesInRegion',this.store.query('zone',{
        filter:{
          region:region.id
        }
      })
    );
    })*/

    model.dispatchItems.then((dispatchItems)=>{
      controller.set('dispatchItems',dispatchItems);
    });




}

});
