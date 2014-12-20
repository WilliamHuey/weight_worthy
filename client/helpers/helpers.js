// Generate ids to uniqify form input ids for custom messages
Template.registerHelper('uniqueIdData', function() {
  return {
    uniqueId: (new Date()).getTime()
  };
});