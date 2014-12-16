Template.addWorkout.events({
  'click .add-set': function(e, template) {
    e.preventDefault();
    Blaze.render(
      Template.addSet,
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
