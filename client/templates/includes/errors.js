Template.errors.helpers({
  errors: function() {
    return Messages.find({
      type: 'error'
    });
  }
});