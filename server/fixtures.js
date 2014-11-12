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