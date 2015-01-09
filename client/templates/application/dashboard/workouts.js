
  var chartWidth = 0,
    chartHeight = 0;


Template.workouts.rendered = function() {

var samp = SampleWorkoutData.find().fetch();
//console.log(JSON.stringify(samp, 4));

var parsedSamp = [];

for(var workouts in samp) {
  var workout = samp[workouts];
  for(var exercises in workout) {   
    if(exercises == 'title') {
      var title = workout[exercises];
    }
    if(typeof workout[exercises] == 'object') {
      var exercise = workout[exercises];
      for(var sets in exercise) {
        if(typeof exercise[sets] == 'object') {
          var set = exercise[sets];
          for(var setInfo in set) {
            if(setInfo == 'exerciseId') {
              var exerciseId = set[setInfo];
            }
            if(typeof set[setInfo] == 'object') {
              var entryDetails = set[setInfo];
              for(var entryDetail in entryDetails) {
                var details = entryDetails[entryDetail];
                var item = {
                  title: title,
                  exerciseId: exerciseId,
                  weight: details.weight,
                  reps: details.reps
                }
                parsedSamp.push(item);
              }
            }
          }
        }
      }
    }
  }
}


  var $chart = $('#chart');

  chartWidth = $chart.width(),
  chartHeight = $chart.height();
  
  var svg = d3.select("#chart").append("svg");

  var barPadding = 1;

  var byFactor = function(value, factor) {
    return value * factor;
  }

  var factorBoost = 4;
 
  svg.selectAll("rect")
    .data(parsedSamp)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return i * (chartWidth / parsedSamp.length);
    })
    .attr("y", function(d) {
      return chartHeight - byFactor(d.reps, factorBoost);
    })
    .attr("width", chartWidth / parsedSamp.length - barPadding)
    .attr("height", function(d) {
      return byFactor(d.reps, factorBoost); 
    })
    .attr("fill", function (d) {
      return "rgb(0, 0, " + parseInt(d.reps * 10,10) + ")";
    });

}