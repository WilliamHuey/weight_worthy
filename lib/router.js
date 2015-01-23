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

Router.route('/settings', {
  name: 'settings'
});

Router.route('/dashboard', {
  name: 'dashboard',
  waitOn: function() {
    return [subsManager.subscribe('workouts')];
  }
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

var clearMessages = function() {
  if(Meteor.isClient) {
    Messages.remove({
      type: 'error'
    });
  }
  this.next();
};

Router.onBeforeAction(requireLogin, {except: 'home'});
Router.onBeforeAction(clearMessages);