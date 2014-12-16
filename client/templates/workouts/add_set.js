 Template.addWorkout.events({
   'click .add-set': function(e, template) {
     e.preventDefault();
    Blaze.render(
      Template.addSet,
      $(e.target).parents('.sets').get(0)
    );
  }
 });
