import Ember from 'ember';


export default Ember.Mixin.create({


  currentPage: function() {

    return parseInt(this.get('selectedPage'), 10) || 1;

  }.property('selectedPage'),

  nextPage: function() {

    var nextPage = this.get('currentPage') + 1;
    var availablePages = this.get('availablePages');

    if (nextPage <= availablePages) {
        return Ember.Object.create({id: nextPage});
    }else{
        return Ember.Object.create({id: this.get('currentPage')});
    }

  }.property('currentPage', 'availablePages'),

  prevPage: function() {

    var prevPage = this.get('currentPage') - 1;

    if (prevPage > 0) {
        return Ember.Object.create({id: prevPage});
    }else{
        return Ember.Object.create({id: this.get('currentPage')});
    }

  }.property('currentPage'),

  availablePages: function() {

    return Math.ceil((this.get('content.grns.length') / this.get('itemsPerPage')) || 1);

  }.property('content.grns.length'),

  paginatedContent: function() {

    var selectedPage = this.get('selectedPage') || 1;
    var upperBound = (selectedPage * this.get('itemsPerPage'));
    var lowerBound = (selectedPage * this.get('itemsPerPage')) - this.get('itemsPerPage');
    var models = this.get('content.grns');

    return models.slice(lowerBound, upperBound);

  }.property('selectedPage', 'content.grns.@each')

});
