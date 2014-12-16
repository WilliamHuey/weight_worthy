Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('exercises', function() {
  return Exercises.find();
});

Meteor.publish('workouts', function() {
  return Workouts.find({userId: this.userId});
});