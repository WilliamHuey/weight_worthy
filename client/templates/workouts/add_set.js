 Template.addWorkout.events({
   'submit form': function(e, template) {
    Blaze.render( Template.addSet , $(e.currentTarget).parent().parent().get(0) );
    e.preventDefault();
  }
 });
