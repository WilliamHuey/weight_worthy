 Template.addWorkout.events({
   'submit form': function(e, template) {    
    Blaze.render( Template.addSet , $( '.exercise' ).get(0) );
    e.preventDefault();
  }
 });
