Workouts = new Mongo.Collection('workouts');

Meteor.methods({
  workoutInsert: function(workout) {
    var user = Meteor.user();
    
    workout.userId = user._id;
    workout.createdAt = new Date();
    
    if(_.isEmpty(workout.title)) {
      workout.title = "Workout - " + workout.createdAt.toString();
    }

    // Validate workout
    var errors = validateWorkout(workout);
    if(_.keys(errors).length > 0) {
      throw new Meteor.Error('invalid-workout', "You must enter the workout fields correctly.");
    }

    var workoutId = Workouts.insert(workout);
    return {
      _id: workoutId
    };
  }
});

validateWorkout = function(workout) {
  var errors = {};
  _.each(workout.exercises, function(exercise) {
    var dbExercise = Exercises.findOne({_id: exercise.exerciseId});
    
    if(!dbExercise) {
      errors[exercise.exerciseInputId] = "Select a valid exercise.";
    }

    _.each(exercise.sets, function(set) {
      
      //Validate has to follow this format
      //validate((number|string), object, string)
      //validate(set.weight, {number: {isTrue: true, greaterThan: 5}}, 'Weight');
      
      var weightVal = parseFloat(set.weight);
      var repsVal = parseFloat(set.reps);
      var weightErrors = Val.validate(weightVal, {number: {isTrue: true, greaterThanEqualTo: 0}}, 'Weight');
      var repsErrors = Val.validate(repsVal, {number: {isTrue: true, greaterThanEqualTo: 0}}, 'Reps');
      if(weightErrors.length > 0)
        errors[set.weightInputId] = weightErrors;

      if(repsErrors.length > 0)
        errors[set.repsInputId] = repsErrors;
         
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
