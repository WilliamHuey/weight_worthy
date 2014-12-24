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
    
    var errMsgs = {
      exercise: "Exercise cannot be blank.",
      weight: "Weight has to be greater than 0.",
      reps: "Reps has to be greater than 0."            
    };
    
    var errPresent = {};

    if(_.keys(errors).length > 0) {
      var errorMessage = "";       
      
      for (var key in errors) {
        //ex. ['exercise', 1111]
        var type = key.split('-')[0];
        //Only concatenate once per error type
        if(typeof errPresent[type] == 'undefined') {
          errorMessage += errMsgs[type] + " ";
          errPresent[type] = true;
        }                
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
    
    button.toggleClass('btn-primary')
          .toggleClass('btn-danger');
    glyphText.toggleClass('glyphicon-plus')
             .toggleClass('glyphicon-minus');
    
    $('.exercise-buttons')
      .children('button')
      .toggleClass('hidden');

    $('.set-btn').toggleClass('hidden');
  }
});