Profile = new Mongo.Collection('profile');

var days = ['mon', 'tue', 'wed', 
  'thu', 'fri', 'sat', 'sun'],
  month = ['jan', 'feb', 'mar', 'apr', 'may', 
  'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
  year = 1850;

var errTypes = {
    name: {string: {lengthGreater: 0}},
    "birthday-day": {string: {within: days}},
    "birthday-month": {string: {within: month}},
    "birthday-year": {number: {greaterThanEqualTo: year}},
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