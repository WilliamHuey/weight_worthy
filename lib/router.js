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
  },
  data: function() {
    return {
      uniqueId: (new Date()).getTime()
    };
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

Router.onBeforeAction(requireLogin, {except: 'home'});