// Local (client-only collection)
Messages = new Mongo.Collection(null);

throwError = function(message) {
  Messages.remove({});
  Messages.insert({
    message: message,
    type: 'error'
  });
};

throwSuccess = function(message) {
  Messages.insert({
    message: message,
    type: 'success'
  });
};