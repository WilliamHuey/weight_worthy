Profile = new Mongo.Collection('profile');

Meteor.methods({
  profileChange: function() {
    console.log('profile changing');
  }
});