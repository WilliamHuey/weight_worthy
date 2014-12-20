Template.addWorkoutExercise.events({
  'click .add-exercise': function(e) {
    e.preventDefault();
   
    Blaze.render(
      Template.addWorkoutExercise,      
      $('#exercises-area').get(0)
    );

  },
  
  'click .del-exercise': function(e) {
    e.preventDefault();
    if ($('.exercise').size() > 1) {
      $(e.target).parents('.exercise').remove();  
    }
  }
});
