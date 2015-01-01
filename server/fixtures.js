
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

if(SampleWorkoutData.find().count() === 0) {
  
  SampleWorkoutData.insert({
   title:"Workout - Wed Dec 31 2014 13:53:29 GMT-0800 (PST)",
   exercises:[
      {
         exerciseId:"jhmQbdqAbwryX4zFb",
         exerciseInputId:"exercise-1420062718479",
         notes:"",
         sets:[
            {
               weight:"5",
               weightInputId:"weight-1420062721054",
               reps:"2",
               repsInputId:"reps-1420062721054"
            }
         ]
      },
      {
         exerciseId:"ocP5BpFaps5Q2gBpM",
         exerciseInputId:"exercise-1420062776084",
         notes:"",
         sets:[
            {
               weight:"7",
               weightInputId:"weight-1420062778358",
               reps:"8",
               repsInputId:"reps-1420062778358"
            }
         ]
      }
   ] 
});

  SampleWorkoutData.insert({
   title:"Workout - Wed Jan 01 2014 15:30:19 GMT-0800 (PST)",
   exercises:[
      {
         exerciseId:"jhmQbdqAbwryX4zFb",
         exerciseInputId:"exercise-1420062818479",
         notes:"",
         sets:[
            {
               weight:"7",
               weightInputId:"weight-1420062721054",
               reps:"20",
               repsInputId:"reps-1420062721054"
            }
         ]
      },
      {
         exerciseId:"ocP5BpFaps5Q2gBpM",
         exerciseInputId:"exercise-1420062876084",
         notes:"",
         sets:[
            {
               weight:"40",
               weightInputId:"weight-1420062878358",
               reps:"10",
               repsInputId:"reps-1420062878358"
            }
         ]
      }
   ] 
});

}
