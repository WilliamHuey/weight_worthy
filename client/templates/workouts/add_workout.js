Template.addWorkout.events({  
  'click #delete-elements': function(e) {
    e.preventDefault();
    $('.exercise-buttons')
      .children('button')
      .toggleClass('hidden');

    $('.set-btn').toggleClass('hidden');
  }
});