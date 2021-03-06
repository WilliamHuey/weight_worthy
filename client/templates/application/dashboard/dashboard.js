Template.dashboard.rendered = function() {

  var templateName = "Profile";

  Blaze.render(
    Template[templateName.toLowerCase()],
    $('#dashboard-content').get(0)
  )  

  $('#dashboard-heading h1').text(templateName);
}

Template.dashboard.events({
  'click #dashboard-ul li': function(e) {
    e.preventDefault();

    //Get dashboard tab text
    var tab = $.trim($(e.target).text()),
    dbHeading = $('#dashboard-heading h1'),
    dbContent = $('#dashboard-content');

    //Do not render the same tab content
    if(dbHeading.text() != tab) {
      //Display the tab in panel heading
      dbHeading.text(tab);
      dbContent.empty();

      //For proper calling of template
      tab = tab.toLowerCase();

      Blaze.render(
        Template[tab],
        dbContent.get(0));
    }  
  }

});