Profile = new Mongo.Collection('profile');

var errTypes = {
    name: {string: {lengthGreater: 0}},
    "birthday-day": {string: {lengthGreater: 0}},
    "birthday-month": {string: {lengthGreater: 0}},
    "birthday-year": {string: {lengthGreater: 0}},
    weight: {number: {greaterThan: 0}},
    "weight-units": {string: {within: ['Pounds', 'Kilograms']}},
    "gender-type": {string: {within: ['Male', 'Female']}},
    location: {string: {lengthGreater: 0}},
  };  

validateProfile = function(profile) {
  var errors = {},
   avoidKeys = ['createdAt', 'userId'];

  for(var key in profile) {
    if(avoidKeys.indexOf(key) == -1) {
      //console.log('key ', key);
      var res = Val.validate(profile[key], errTypes[key], key);
      //console.log(res);
      //console.log('-------------------');
    }  
  }
    
  
};

Meteor.methods({
  profileChange: function(profile) {

    var user = Meteor.user();
    
    profile.userId = user._id;
    profile.createdAt = new Date();
    //console.log('profile changing');

    var errors = validateProfile(profile);


    //Validate profile
  }
});