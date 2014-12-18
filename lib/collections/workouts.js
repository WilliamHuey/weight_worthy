Workouts = new Mongo.Collection('workouts');

var validate = (function() {  

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
      //Generate the message for a specific attrRule
      greaterThan: function(inputData, againstValue) {
//         console.log('msg gt ' + inputData + ' ' + againstValue);
        return dataType + ' is not greater than ' + againstValue;
      },
      greaterThanEqualTo: function(inputData, againstValue) {
//         console.log('msg gt ' + inputData + ' ' + againstValue);
        return dataType + ' is not greater than or equal to ' + againstValue;
      },
      isTrue: function(inputData) {
//         console.log('in isTrue msg');
//         console.log('msg istrue ' + inputData);
        return dataType + ' is not a number.';
      }
      /*
      lessThan: function() {
        return inputData + ' is not less than ' + againstValue;
      }
      //More messages here
      */
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
//         console.log('number is greater than against value ', (inputData > againstValue));
        return inputData > againstValue;
      },
      greaterThanEqualTo: function(inputData, againstValue) {
//         console.log('number is greater than against value ', (inputData > againstValue));
        return inputData >= againstValue;
      },
      isTrue: function(inputData) {
//         console.log('check number is true ', inputData);
//         console.log(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(inputData));
        return !!(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(inputData));
      }    
     
    }  
  };

  //Run the checks against the validation patterns
  var validationCheck = function(passedCheck, inputData) {
//     console.log('pass check ' + passedCheck + " " + inputData);
    //Only generate a message value that was not validated
    if(!passedCheck) {
//       console.log('pc second level key ', secondLevelKey);
//       console.log('against value ', againstValue);
      return validationMessage[topLevelKey][secondLevelKey](inputData, againstValue);
    }
  };
  
  /*
      var args = arguments;
    attr = args[1];
    attrRule = args[2];
    inputData = args[0];
    againstValue = args[3];   
  */

  //Starts off the validation
  return function() {
    var args = arguments,
    inputData = args[0],
    attrRules = args[1];
    
    //console.log('dataType', dataType);
    dataType = args[2];    
    
//     console.log('input data is ', inputData);
          
    //New format
    //validate(set.weight, rules, dataType);
    
    //Sample new input
    //validate(set.weight, {number: {isTrue: true, greaterThan: 5}}, 'Weight');
    
    //Old format
    //validate(inputData, 'number', 'greaterThan', 5);
    
    /*
    [{
      errorMessage: 'Your balls are large'
    }, {
      errorMessage: 'Your shaft is too long'
    }]*/
    
    
    
    
      var errorMsgArray = [];
    
    
      //Iterate through the object and collect possible errors
      for(var key in attrRules) {
        topLevelKey = key;
        for(var key2 in attrRules[key]) {
          secondLevelKey = key2;
          //console.log(key2);
//           console.log('top level key ', [key]);
//           console.log('second level ', [key2]);
//           console.log('input data obj loop ', inputData);
          againstValue = attrRules[key][key2];
          
          
          //validationDefinitions[key][key2](inputData, againstValue);
          
          
          var valStatus = validationDefinitions[key][key2](inputData, againstValue);
          //console.log();
          var valMsg = validationCheck(valStatus, inputData);
          
          //No errors -> no pushing
          if(!valStatus) {
            console.log('invalid');
            errorMsgArray.push({ errorMessage: valMsg});
          } 
          
          
           
          console.log('-------');
          
          
          
        }
               
      }
    
      return errorMsgArray;
    
    
    //Kicks off the validation check with supplied data
    //return validationCheck(validationDefinitions[attr][attrRule]());

  };  
  
})();

Meteor.methods({
  workoutInsert: function(exercisesArray) {
    var user = Meteor.user();
    
    var workout = {
      userId: user._id,
      createdAt: new Date(),
      exercises: exercisesArray
    };
    workout.title = "Workout - " + workout.createdAt.toString();
  }
});

validateWorkout = function(workout) {
  var errors = {};
  _.each(workout.exercises, function(exercise) {
    _.each(exercise.sets, function(set) {
      errors[set.weightInputId] = [];
      
      /*
      if(validate(set.weight, 'is', 'notEmpty')) {
        errors[set.weightInputId].push({
          errorMessage: "Weight can not be blank"
        });
        
      }
      */
      //Validate has to follow this format
      //validate((number|string), object, string)
      //validate(set.weight, {number: {isTrue: true, greaterThan: 5}}, 'Weight');
      var weightVal = parseInt(set.weight, 10);
      errors[set.weightInputId] = validate(weightVal, {number: {isTrue: true, greaterThanEqualTo: 0}}, 'Weight');
    
      
      
      
     // Binh's idea
     //Valid - Returns empty array
     //Invalid - Returns error array with error objects
      //Rules - JSON object with one or multiple validation rules
      //{number: {true: true, greaterThan: 5}}
     //errors[set.weightInputId] = validate(set.weight, rules, dataType);
      
      
    });
  });
  
  //Weight
  //Number value (integer or decimal)
  //  Greater or equal to zero
  
  //Reps
  //Can only be an integer
  //  Greater or equal to one
 
  

  
  return errors;
};
