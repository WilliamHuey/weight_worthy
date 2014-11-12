Router.configure({
  layoutTemplate: 'layout',
  // loadingTemplate: 'loading',
  // notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

Router.route('/addWorkout', {
  name: 'addWorkout'
});

Router.route('/history', {
  name: 'history'
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
  name: 'home'
});


var requireLogin = function() {
  if(!Meteor.user()) {
    if(Meteor.loggingIn()){

    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

var loginRedirect = function() {
  if(Meteor.user()) {
    this.redirect('/dashboard');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'dashboard'});
Router.onBeforeAction(loginRedirect, {except: ['dashboard']})