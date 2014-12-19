Template.addWorkoutButtons.events({
  'click #save-workout': function(e) {
    e.preventDefault();
    var exercises = [];
    $('.exercise').each(function(exEle) {
      var exId = $(this).find('select')
        .children('option:selected')
        .val();
      var exercise = {
        'exerciseId': exId,
        'sets': []
      };
      var sets = $(this).find('.set');
      sets.each(function() {
        var $this = $(this),
        weightField = $this.find('input[name=weight]'),
        weight = weightField.val(),
        weightInputId = weightField.attr('id'),
        repsField = $this.find('input.reps'),
        reps = repsField.val(),
        repsInputId = repsField.attr('id'),
        set = {
          'weight': weight,
          'weightInputId': weightInputId,
          'reps': reps,
          'repsInputId': repsInputId
        };
        exercise.sets.push(set);
      });
      exercises.push(exercise);
      
      var workout = {
        exercises: exercises
      };
      var errors = validateWorkout(workout);
      console.log(errors);

      if(_.keys(errors).length > 0) {
        throwError('Weight needs to be greater than 0.\nReps needs to be greater than 0.');
        return Session.set('addWorkoutErrors', errors);
      } else {
        Errors.remove({});
        Session.set('addWorkoutErrors', errors);
      }
      
      Meteor.call('workoutInsert', exercises, function(error, result) {
        if (error)
          return alert(error.reason);
        //Router.go('/dashboard');
      });
    });
  }
});