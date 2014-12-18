// Write your tests here!
// Here is an example.
Tinytest.add('is empty', function (test) {
  var blankVal = '';
  var errorMessages = Val.validate(blankVal, {is: {notEmpty: true}}, 'Blank');
  var actualMessages = [{
    "errorMessage": "Blank is empty."
  }];
  test.equal(errorMessages, actualMessages);
});


