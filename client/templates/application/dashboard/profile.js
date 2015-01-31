Template.profile.events({
  'click #save-profile': function(e) {
    e.preventDefault();

    //console.log(e);
    Meteor.call('profileChange', 'stuff', function(error, result) {
      console.log('called profile change');      
    });
  }
});