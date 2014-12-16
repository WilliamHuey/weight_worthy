Router.configure({
  layoutTemplate: 'layout',
  // loadingTemplate: 'loading',
  // notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')];
  }
});

var subsManager = new SubsManager();

Router.route('/addWorkout', {
  name: 'addWorkout',
  waitOn: function() { 
    return [subsManager.subscribe('exercises')];
  }
});

Router.route('/history', {
  name: 'history',
  waitOn: function() {
    return [Meteor.subscribe('workouts')];
  }
});

Router.route('/stats', {
  name: 'stats'
});

Router.route('/settings', {
  name: 'settings'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/', {
  name: 'home',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.redirect('/dashboard');
    }
    this.next();
  }
});


var requireLogin = function() {
  if(!Meteor.user()) {
    if(!Meteor.loggingIn()){  
      this.redirect('home');
    }
  } else {
    this.next();
  }
}

var loginRedirect = function() {
  if(Meteor.loggingIn()) {
    this.redirect('/dashboard');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {except: 'home'});
Router.onBeforeAction(loginRedirect, {except: ['dashboard']})