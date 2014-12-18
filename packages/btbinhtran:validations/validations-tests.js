// Write your tests here!
// Here is an example.
Tinytest.add('validate is empty', function(test) {
  var blankVal = '';
  var actualMessages = Val.validate(blankVal, { is: { notEmpty: true } }, 'Blank');
  var expectedMessages = [{
    "errorMessage": "Blank is empty."
  }];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate is not empty', function(test) {
  var str = 'blah';
  var actualMessages = Val.validate(str, { is: { notEmpty: true } }, 'Blank');
  var expectedMessages = [];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate is number', function(test) {
  var num = 3;
  var actualMessages = Val.validate(num, { number: { isTrue: true } }, 'Number');
  var expectedMessages = [];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate is not a number', function(test) {
  var num = 'a string of course';
  var actualMessages = Val.validate(num, { number: { isTrue: true } }, 'Number');
  var expectedMessages = [{
    "errorMessage": "Number is not a number."
  }];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate number is greater than is true', function(test) {
  var num = 11;
  var actualMessages = Val.validate(num, { number: { greaterThan: 10 } }, 'Number');
  var expectedMessages = [];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate number is greater than is false', function(test) {
  var num = 5;
  var actualMessages = Val.validate(num, { number: { greaterThan: 10 } }, 'Number');
  var expectedMessages = [{
    "errorMessage": "Number is not greater than 10."
  }];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate number is greater than or equal to is false', function(test) {
  var num = 0;
  var actualMessages = Val.validate(num, { number: { greaterThanEqualTo: 5 } }, 'Number');
  var expectedMessages = [{
    "errorMessage": "Number is not greater than or equal to 5."
  }];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate number is greater than or equal to is true', function(test) {
  var num = 5;
  var actualMessages = Val.validate(num, { number: { greaterThanEqualTo: 0 } }, 'Number');
  var expectedMessages = [];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate number is less than is false', function(test) {
  var num = 10;
  var actualMessages = Val.validate(num, { number: { lessThan: 5 } }, 'Number');
  var expectedMessages = [{
    "errorMessage": "Number is not less than 5."
  }];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate number is less than is true', function(test) {
  var num = 5;
  var actualMessages = Val.validate(num, { number: { lessThan: 10 } }, 'Number');
  var expectedMessages = [];
  test.equal(actualMessages, expectedMessages);  
});

Tinytest.add('validate number is less than or equal to is false', function(test) {
  var num = 10;
  var actualMessages = Val.validate(num, { number: { lessThanEqualTo: 5 } }, 'Number');
  var expectedMessages = [{
    "errorMessage": "Number is not less than or equal to 5."
  }];
  test.equal(actualMessages, expectedMessages);
});

Tinytest.add('validate number is less than or equal to is true', function(test) {
  var num = 5;
  var actualMessages = Val.validate(num, { number: { lessThanEqualTo: 5 } }, 'Number');
  var expectedMessages = [];
  test.equal(actualMessages, expectedMessages);  
});