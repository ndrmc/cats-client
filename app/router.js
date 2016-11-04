import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('grns', function() {
    this.route('index', { path: '/' });
    this.route('list');
    this.route('new');
    this.route('edit', { path: '/edit/:id' } );
    this.route('show', { path: '/show/:id' } );
  });
  this.route('run');

  this.route('dispatch', function() {
    this.route('new');
    this.route('list');

    this.route('detail', {
      path: ':dispatchID'
    });
  });

  this.route('edit');
});

export default Router;
