Template.addWorkoutExercise.events({
  'click .add-exercise': function(e) {
    e.preventDefault();
   
    Blaze.renderWithData(
      Template.addWorkoutExercise,
      {
        uniqueId: (new Date()).getTime()
      },
      $('#exercises-area').get(0)
    );

  },
  'click .del-exercise': function(e) {
    e.preventDefault();
    if ($('.exercise').size() > 1) {
      $(e.target).parents('.exercise').remove();  
    }
  },
  'click #add-note': function(e) {
    e.preventDefault();
    $(e.target).parents('div.exercise')
      .find('div.notes')
      .toggleClass('hidden');
  }
});
