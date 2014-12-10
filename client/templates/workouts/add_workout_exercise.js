Template.addWorkoutExercise.events({
  'click .add-exercise': function(e) {
    Blaze.render( Template.addWorkoutExercise , $( '#main' ).get(0) );
    e.preventDefault();
  }
});