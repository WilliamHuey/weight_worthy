Template.addWorkoutExercise.events({
  'click .add-exercise': function(e) {
    Blaze.render( Template.addWorkoutExercise , $( '#exercises-area' ).get(0) );
    e.preventDefault();
  }
});