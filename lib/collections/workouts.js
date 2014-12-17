Workouts = new Mongo.Collection('workouts');

Meteor.methods({
  workoutInsert: function(exercisesArray) {
    var user = Meteor.user();
    
    var workout = {
      userId: user._id,
      createdAt: new Date(),
      exercises: exercisesArray
    };
    workout.title = "Workout - " + workout.createdAt.toString();

    
  }
});

validateWorkout = function(workout) {
  var errors = {};
  _.each(workout.exercises, function(exercise) {
    _.each(exercise.sets, function(set) {
      if(_.isEmpty(set.weight)) {
        errors[set.weightInputId] = "Weight should not be blank";
      }
    });
  });
  
  return errors;
};
