Template.addWorkoutButtons.events({
  'click #save-workout': function(e) {
    e.preventDefault();
    var exercises = [];
    $('.exercise').each(function(exEle) {
      var exSelect = $(this).find('select');
      var notes = $(this).find('textarea.notes').val();
      // console.log(notes);
      var exId = exSelect
        .children('option:selected')
        .val();
      var exercise = {
        'exerciseId': exId,
        'exerciseInputId': exSelect.attr('id'),
        'notes': notes,
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
    });

    // Save workout
    var title = $("input[name=title]").val();
    var workout = {
      title: title,
      exercises: exercises
    };
    var errors = validateWorkout(workout);

    if(_.keys(errors).length > 0) {
      var errorMessage = "";
      var hasExerciseError = false;
      var hasWeightError = false;
      var hasRepsError = false;
      for (var key in errors) {
        if (key.lastIndexOf('exercise') === 0) {
          hasExerciseError = true;
        } else if(key.lastIndexOf('weight') === 0) {
          hasWeightError = true;
        } else if(key.lastIndexOf('reps') === 0) {
          hasRepsError = true;
        }
      }

      // Build error message
      if(hasExerciseError) {
        errorMessage += "Exercise cannot be blank.\n";
      }
      if(hasWeightError) {
        errorMessage += "Weight has to be greater than 0.\n";
      }
      if(hasRepsError) {
        errorMessage += "Reps has to be greater than 0.\n";
      }

      throwError(errorMessage);
      return Session.set('addWorkoutErrors', errors);
    } else {
      Messages.remove({});
      Session.set('addWorkoutErrors', errors);
    }
    
    Meteor.call('workoutInsert', workout, function(error, result) {
      if (error)
        return alert(error.reason);
      throwSuccess('Added a new workout!');
      //Router.go('/dashboard');
    });
  },
  'click #mode-btn': function(e) {
    e.preventDefault();
    var button = $(e.target),
        glyphText = button.find('span.glyphicon');
    
    if(button.hasClass('btn-primary')) {
      button.removeClass('btn-primary');
      button.addClass('btn-danger');
      glyphText.removeClass('glyphicon-plus');
      glyphText.addClass('glyphicon-minus');
    } else {
      button.removeClass('btn-danger');
      button.addClass('btn-primary');
      glyphText.removeClass('glyphicon-minus');
      glyphText.addClass('glyphicon-plus');
    }
    
    $('.exercise-buttons')
      .children('button')
      .toggleClass('hidden');

    $('.set-btn').toggleClass('hidden');
  }
});