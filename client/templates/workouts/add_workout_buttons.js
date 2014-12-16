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
        var weight = $(this).find('input[name=weight]').val();
        var reps = $(this).find('input.reps').val();
        var set = {
          'weight': weight,
          'reps': reps
        };
        exercise.sets.push(set);
      });
      exercises.push(exercise);
      
      Meteor.call('workoutInsert', exercises, function(error, result) {
        if (error)
          return alert(error.reason);
        Router.go('/dashboard');
      });
    });
  }
});