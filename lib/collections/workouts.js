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
      errors[set.weightInputId] = [];
      
      //Validate has to follow this format
      //validate((number|string), object, string)
      //validate(set.weight, {number: {isTrue: true, greaterThan: 5}}, 'Weight');
      
      var weightVal = parseInt(set.weight, 10);
      errors[set.weightInputId] = Val.validate(weightVal, {number: {isTrue: true, greaterThanEqualTo: 0}}, 'Weight');
         
       //Valid - Returns empty array
       //Invalid - Returns error array with error objects
       //Rules - JSON object with one or multiple validation rules
        //{number: {true: true, greaterThan: 5}}
       //errors[set.weightInputId] = validate(set.weight, rules, dataType);
      
        //Weight
        //Number value (integer or decimal)
        //  Greater or equal to zero

        //Reps
        //Can only be an integer
        //  Greater or equal to one

    });
  });
  
  return errors;
};
