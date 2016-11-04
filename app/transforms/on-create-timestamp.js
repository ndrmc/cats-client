import DS from 'ember-data';

export default DS.DateTransform.extend({

  serialize(deserialized) {
    return this._super(deserialized || new Date()) ;
  }
});
