Template.addSet.created = function() {
};


Template.addSet.helpers({
  errorClass: function(field) {
    return !!Session.get('addWorkoutErrors')[field] ? 'has-error' : '';
  },
  uniqueWeightId: function() {
    return 'weight-' + this.uniqueId; 
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
