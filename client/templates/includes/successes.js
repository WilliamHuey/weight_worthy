Template.successes.helpers({
  successes: function() {
    return Messages.find({
      type: 'success'
    });
  }
});

Template.success.rendered = function() {
  var message = this.data;
  Meteor.setTimeout(function() {
    Messages.remove(message._id);
  }, 2000);
};