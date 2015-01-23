
if (Exercises.find().count() === 0) {
  var exercises = JSON.parse(Assets.getText("exercises.json"));

  for (var i = 0, len = exercises.length; i < len; i++) {
    var exercise = exercises[i];

    Exercises.insert({
      name: exercise.name,
      muscle: exercise.muscle,
      equipment: exercise.equipment,
      type: exercise.type,
      mechanics: exercise.mechanics,
      force: exercise.force,
      isSport: exercise.is_sport,
      level: exercise.level
    });
  }
}

var username = password = "anewone";
if(Meteor.users.find({ username: username }).count() == 0) {
  
  var workoutExercises = Exercises.find({}, { limit: 6 }).fetch();  
  
  var userId = Accounts.createUser({
    username: username,
    email: username + "@" + username + ".com"
  });

  Accounts.setPassword(userId, password);

  Workouts.insert({
    userId: userId,
    title: "Workout - Tue Jan 13 2015 22:12:46 GMT-0800 (PST)",
    exercises: [{
      exerciseId: workoutExercises[0]._id,
      exerciseInputId: "exercise-1420062718479",
      notes: "",
      sets: [{
        weight: "15",
        weightInputId: "weight-1420062721054",
        reps: "3",
        repsInputId: "reps-1420062721054"
      }]
    }, {
      exerciseId: workoutExercises[1]._id,
      exerciseInputId: "exercise-1420062776084",
      notes: "",
      sets: [{
        weight: "7",
        weightInputId: "weight-1420062778358",
        reps: "8",
        repsInputId: "reps-1420062778358"
      }]
    }],
    createdAt: moment("2015-01-13T06:12:46.336")
  });

  Workouts.insert({
    userId: userId,
    title: "Workout - Tue Jan 14 2015 22:12:46 GMT-0800 (PST)",
    exercises: [{
      exerciseId: workoutExercises[3]._id,
      exerciseInputId: "exercise-1420062718479",
      notes: "",
      sets: [{
        weight: "34",
        weightInputId: "weight-1420068419254",
        reps: "20",
        repsInputId: "reps-1420068419254"
      }]
    }, {
      exerciseId: workoutExercises[5]._id,
      exerciseInputId: "exercise-1420096166982",      
      notes: "",
      sets: [{
        weight: "11",
        weightInputId: "weight-1420079697253",        
        reps: "9",
        repsInputId: "reps-1420079697253"
      }, {
        weight: "15",
        weightInputId: "weight-1420079697253",        
        reps: "21",
        repsInputId: "reps-1420079697253"
      }, {
        weight: "6",
        weightInputId: "weight-1420001849722",        
        reps: "20",
        repsInputId: "reps-1420001849722"
      }]
    }],
    createdAt: moment("2015-01-14T06:12:46.336")
  });    

  Workouts.insert({
    userId: userId,
    title: "Workout - Fri Jan 15 2015 22:12:46 GMT-0800 (PST)",
    exercises: [{
      exerciseId: workoutExercises[2]._id,
      exerciseInputId: "exercise-1420062814638",
      notes: "",
      sets: [{
        weight: "30",
        weightInputId: "weight-1420062723089",
        reps: "20",
        repsInputId: "reps-1420062723089"
      }]
    }],
    createdAt: moment("2015-01-15T06:12:46.336")
  });

  Workouts.insert({
    userId: userId,
    title: "Workout - Fri Jan 16 2015 22:12:46 GMT-0800 (PST)",
    exercises: [{
      exerciseId: workoutExercises[3]._id,
      exerciseInputId: "exercise-1420062815432",
      notes: "",
      sets: [{
        weight: "45",
        weightInputId: "weight-1420062727723",
        reps: "14",
        repsInputId: "reps-1420062727723"
      }]
    }],
    createdAt: moment("2015-01-16T06:12:46.336")
  });
}  



