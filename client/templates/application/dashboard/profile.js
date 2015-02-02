var errPresent = {},
  profile = {},
  errors;

Template.profile.events({
  'click #save-profile': function(e) {
    e.preventDefault();

    $('.form-group.block')
      .children('.form-control.input')
      .each(function() {
      profile[$(this).attr('id')] = $(this).val();
    });

      //console.log('profile is now', profile);
      //console.log(profile.name);

    //console.log(e);
    Meteor.call('profileChange', profile, function(error, result) {
      console.log('called profile change');      
    });
  }
});