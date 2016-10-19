import Ember from 'ember';


export default Ember.Mixin.create({


  currentPage: Ember.computed( 'selectedPage', function() {

    return parseInt(this.get('selectedPage'), 10) || 1;

  }),

  nextPage: Ember.computed( 'currentPage', 'availablePages',  function() {

    var nextPage = this.get('currentPage') + 1;
    var availablePages = this.get('availablePages');

    if (nextPage <= availablePages) {
        return Ember.Object.create({id: nextPage});
    }else{
        return Ember.Object.create({id: this.get('currentPage')});
    }

  }),

  prevPage: Ember.computed( 'currentPage',  function() {

    var prevPage = this.get('currentPage') - 1;

    if (prevPage > 0) {
        return Ember.Object.create({id: prevPage});
    }else{
        return Ember.Object.create({id: this.get('currentPage')});
    }

  }),

  availablePages: Ember.computed( 'items.length', function() {

    return Math.ceil((this.get('items.length') / this.get('itemsPerPage')) || 1);

  }),

  paginatedContent: Ember.computed( 'selectedPage', 'items.@each', function() {

    var selectedPage = this.get('selectedPage') || 1;
    var upperBound = (selectedPage * this.get('itemsPerPage'));
    var lowerBound = (selectedPage * this.get('itemsPerPage')) - this.get('itemsPerPage');
    var models = this.get('items');

    return models.slice(lowerBound, upperBound);

  })

});
