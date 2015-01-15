
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

  var userId = Accounts.createUser({
    username: username,
    email: username + "@" + username + ".com"
  });

  Accounts.setPassword(userId, password);

  Workouts.insert({
    userId: userId,
    title: "Workout - Tue Jan 13 2015 22:12:46 GMT-0800 (PST)",
    exercises: [{
      exerciseId: "jhmQbdqAbwryX4zFb",
      exerciseInputId: "exercise-1420062718479",
      notes: "",
      sets: [{
        weight: "15",
        weightInputId: "weight-1420062721054",
        reps: "3",
        repsInputId: "reps-1420062721054"
      }]
    }, {
      exerciseId: "ocP5BpFaps5Q2gBpM",
      exerciseInputId: "exercise-1420062776084",
      notes: "",
      sets: [{
        weight: "7",
        weightInputId: "weight-1420062778358",
        reps: "8",
        repsInputId: "reps-1420062778358"
      }]
    }],
     createdAt: new Date("2015-01-13T06:12:46.336Z") ,     
     _id: "EqSnyb2DyLomYhcgz"  
  });

    

  Workouts.insert({
    userId: userId,
    title: "Workout - Fri Jan 15 2015 22:12:46 GMT-0800 (PST)",
    exercises: [{
      exerciseId: "akmLbcqZbwwyQ4zGb",
      exerciseInputId: "exercise-1420062818479",
      notes: "",
      sets: [{
        weight: "30",
        weightInputId: "weight-1420062721054",
        reps: "20",
        repsInputId: "reps-1420062721054"
      }]
    }],
    createdAt: new Date("2015-01-15T06:12:46.336Z"),
     _id: "ZaJct272LxUkM2Low"
  });

  Workouts.insert({
    userId: userId,
    title: "Workout - Fri Jan 16 2015 22:12:46 GMT-0800 (PST)",
    exercises: [{
      exerciseId: "akmLbcqZbwwyQ4zGb",
      exerciseInputId: "exercise-1420062818479",
      notes: "",
      sets: [{
        weight: "45",
        weightInputId: "weight-1420062721054",
        reps: "14",
        repsInputId: "reps-1420062721054"
      }]
    }],
    createdAt: new Date("2015-01-16T06:12:46.336Z"),
     _id: "Baact895HxJkM3Lpc"
  });

}  



