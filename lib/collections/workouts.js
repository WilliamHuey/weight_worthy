Workouts = new Mongo.Collection('workouts');

Mesosphere({
    name: 'addWorkout',
    method: 'workoutInsert',
    fields: {
        exerciseId: {
            required: true,
            message: 'Requires a exercise id'
        }
    }

});

Meteor.methods({
  workoutInsert: function(exercisesArray) {
    var user = Meteor.user();
    
    var workout = {
      userId: user._id,
      createdAt: new Date(),
      exercises: exercisesArray
    };
    workout.title = "Workout - " + workout.createdAt.toString();

    console.log(exercisesArray);

    var validationObject = Mesosphere.addWorkout.validate(exercisesArray);

    console.log(validationObject);
    
    /*
    var workoutId = Workouts.insert(workout);
    
    return {
      _id: workoutId
    };
*/

  }
})