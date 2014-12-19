// Write your package code here!
Val = {};

Val.validate = (function() {  

  //Make these variables accessible to all functions inside validator
  var inputData, againstValue, dataType;

  //Determine which message type should be used
  //These messages are in the negative because there are errors
  var validationMessage = {
    is: {
      notEmpty: function() {
        return dataType + ' is empty.';
      }       
    },
    number: {
      //Generate the message for a specific attribute rule
      greaterThan: function() {
        return dataType + ' is not greater than ' + againstValue + '.';
      },
      greaterThanEqualTo: function() {
        return dataType + ' is not greater than or equal to ' + againstValue + '.';
      },
      lessThan: function() {
        return dataType + ' is not less than ' + againstValue + '.';
      },
      lessThanEqualTo: function() {
        return dataType + ' is not less than or equal to ' + againstValue + '.';
      },
      isTrue: function() {
        return dataType + ' is not a number.';
      }
    }
  };  

  //Validation patterns
  //Passed-in data are compared against the desired value (againstValue)
  var validationDefinitions = {
    is: {
      notEmpty: function() {
        return !_.isEmpty(inputData);
      }      
    },
    number: {
      greaterThan: function() {
        return inputData > againstValue;
      },
      greaterThanEqualTo: function() {
        return inputData >= againstValue;
      },
      lessThan: function() {
        return inputData < againstValue;
      },      
      lessThanEqualTo: function() {
        return inputData <= againstValue;
      },
      isTrue: function() {
        return !!(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(inputData));
      }         
    }  
  };

  //Run the checks against the validation patterns
  var validationCheck = function(passedCheck, validatingType, validatingTypeAttr) {
    //Only generate a message value that was not validated
    if(!passedCheck) {
      return validationMessage[validatingType][validatingTypeAttr]();
    }
  };
  
  //Starts off the validation
  return function() {
    var args = arguments;
    inputData = args[0];
    validationCriteria = args[1];    
    dataType = args[2];        
    
      var errorMsgArray = [];
    
      //Iterate through the object and collect possible errors
      for(var validatingType in validationCriteria) {
        for(var validatingTypeAttr in validationCriteria[validatingType]) {       
          //Some validations are compared against a value
          //Get this value in case there is one
          againstValue = validationCriteria[validatingType][validatingTypeAttr];
                              
          var valStatus = validationDefinitions[validatingType][validatingTypeAttr]();
          
          //Validation check will generate a message
          var valMsg = validationCheck(valStatus, validatingType, validatingTypeAttr);
          
          //Only push error objects when there are errors
          if(!valStatus) {
            errorMsgArray.push({ errorMessage: valMsg});
          }           
        }
               
      }
    
      return errorMsgArray;
  };  
  
})();