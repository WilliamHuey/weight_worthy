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
  weightErrorMessages: function() {
    var weightId = 'weight-' + this.uniqueId;
    var errors = Session.get('addWorkoutErrors');
    var errorObject = {};

    if(typeof errors !== 'undefined') {
      errorObject['errorMessages'] = errors[weightId];
    }
    return errorObject;
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
    if($('.set').size() > 1) {
      $(e.target).parents('.set').remove();
    }
  }
});
