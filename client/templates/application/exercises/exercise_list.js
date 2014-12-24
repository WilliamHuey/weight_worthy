 
Template.exercisesList.helpers({
  exercises: function() {
    return Exercises.find();
  },
  exerciseUniqueId: function() {
    var exerciseId = '';
    if(this.uniqueId) {
      exerciseId = 'exercise-' + this.uniqueId;
    }
    return exerciseId;
  },
  errorClass: function(field) {
    var addWorkoutErrors = Session.get('addWorkoutErrors');
    return (typeof addWorkoutErrors !== 'undefined') &&
      typeof addWorkoutErrors[field] !== 'undefined' &&
      (addWorkoutErrors[field]) ? 'has-error' : '';
  },
});
