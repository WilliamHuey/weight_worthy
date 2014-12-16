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
    
    var workoutId = Workouts.insert(workout);
    
    return {
      _id: workoutId
    };
  }
})