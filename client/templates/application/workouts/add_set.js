Template.addSet.helpers({
  errorClass: function(field) {
    var addWorkoutErrors = Session.get('addWorkoutErrors');
    return (typeof addWorkoutErrors !== 'undefined') &&
      typeof addWorkoutErrors[field] !== 'undefined' &&
      (addWorkoutErrors[field].length > 0) ? 'has-error' : '';
  },
  uniqueWeightId: function() {
    return 'weight-' + this.uniqueId; 
  },
  uniqueRepsId: function() {
    return 'reps-' + this.uniqueId;
  }
});

Template.addSet.events({
  'click .add-set': function(e, template) {
    e.preventDefault();
    Blaze.renderWithData(
      Template.addSet,
      {
        uniqueId: (new Date()).getTime()
      },
      $(e.target).parents('.sets').get(0)
    );
  },
  'click .del-set': function(e) {
    e.preventDefault();

    //Only allow removal if more than one set present
    if($(e.target).parents('.sets').children().length > 1) {
      $(e.target).parents('.set').remove();
    }
  }
});
