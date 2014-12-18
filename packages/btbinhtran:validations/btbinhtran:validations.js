// Write your package code here!
Val = {};

Val.validate = (function() {  

  //Make these variables accessible to all functions inside validator
  var inputData, againstValue, attr, attrRule, topLevelKey, secondLevelKey, dataType;

  //Determine which message type should be used
  var validationMessage = {
    is: {
      notEmpty: function(inputData) {
        return dataType + ' is empty.';
      }       
    },
    number: {
      //Generate the message for a specific attribute rule
      greaterThan: function(inputData, againstValue) {
        return dataType + ' is not greater than ' + againstValue;
      },
      greaterThanEqualTo: function(inputData, againstValue) {
        return dataType + ' is not greater than or equal to ' + againstValue;
      },
      isTrue: function(inputData) {
        return dataType + ' is not a number.';
      }
    }
  };  

  //Validation patterns
  //Passed-in data are compared against the desired value (againstValue)
  var validationDefinitions = {
    is: {
      notEmpty: function(inputData) {
        return !_.isEmpty(inputData);
      }      
    },
    number: {
      greaterThan: function(inputData, againstValue) {
        return inputData > againstValue;
      },
      greaterThanEqualTo: function(inputData, againstValue) {
        return inputData >= againstValue;
      },
      isTrue: function(inputData) {
        return !!(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(inputData));
      }         
    }  
  };

  //Run the checks against the validation patterns
  var validationCheck = function(passedCheck, inputData) {
    //Only generate a message value that was not validated
    if(!passedCheck) {
      return validationMessage[topLevelKey][secondLevelKey](inputData, againstValue);
    }
  };
  
  //Starts off the validation
  return function() {
    var args = arguments,
    inputData = args[0],
    attrRules = args[1];
    
    dataType = args[2];        
    
      var errorMsgArray = [];    
    
      //Iterate through the object and collect possible errors
      for(var key in attrRules) {
        topLevelKey = key;
        for(var key2 in attrRules[key]) {
          secondLevelKey = key2;
          //Some validations are compared against a value
          //Get this value in case there is one
          againstValue = attrRules[key][key2];
                              
          var valStatus = validationDefinitions[key][key2](inputData, againstValue);
          
          //Validation check will generate a message
          var valMsg = validationCheck(valStatus, inputData);
          
          //Only push error objects when there are errors
          if(!valStatus) {
            errorMsgArray.push({ errorMessage: valMsg});
          }           
        }
               
      }
    
      return errorMsgArray;
  };  
  
})();

console.log('Validate ', Validate);
