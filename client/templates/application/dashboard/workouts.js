Workouts.find({ userId: Meteor.userId() }).observe({
  added: function(doc) {
    $('#chart').empty();
    Template.workouts.rendered();
  },
  removed: function(doc) {
    $('#chart').empty();
    Template.workouts.rendered();
  }
});
  

Template.workouts.rendered = function() {  
var samp  = Workouts.find({ userId: Meteor.userId() }).fetch();
  
var parsedSamp = [[], []],
  setCount = 0;

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
                var item1 = {
                  x: setCount,
                  y: details.weight,
                  title: title,
                  exerciseId: exerciseId,
                  weight: details.weight
                }
                var item2 = {
                  x: setCount,
                  y: details.reps,
                  title: title,
                  exerciseId: exerciseId,
                  reps: details.reps
                }
                parsedSamp[0].push(item1);
                parsedSamp[1].push(item2);
                setCount++;
              }
            }
          }
        }
      }
    }
  }
}

  var $chart = $('#chart');

  var chartWidth = $chart.width(),
  chartHeight = $chart.height();

  var stack = d3.layout.stack();
  stack(parsedSamp);
  
  var svg = d3.select("#chart").append("svg");

  var colors = d3.scale.category10();

  var xScale = d3.scale.ordinal()
        .domain(d3.range(parsedSamp[0].length))
        .rangeRoundBands([0, chartWidth], 0.05);
    
  var yScale = d3.scale.linear()
    .domain([0,       
      d3.max(parsedSamp, function(d) {
        return d3.max(d, function(d) {
          return d.y0 + d.y;
        });
      })
    ])
    .range([0, chartHeight]);

  var groups = svg.selectAll("g")
    .data(parsedSamp)
    .enter()
    .append("g")
    .style("fill", function(d, i) {
      return colors(i);
  });

  var rects = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return chartHeight - yScale(d.y0) - yScale(d.y);
    })
    .attr("height", function(d) {
      return yScale(d.y);
    })
    .attr("width", xScale.rangeBand());
      
    svg
      .append("g")
      .attr("class", 'weight')
      .style("fill", "rgb(255,255,255)")
      .selectAll("text")
      .data(parsedSamp[0])
      .enter()
      .append("text")
      .text(function(d) {
        return 'Weight: ' + d.weight;
      })
      .attr("x", function(d, i) {
        return xScale(i);
      })
      .attr("y", function(d) {
        return chartHeight;
      });

     svg
      .append("g")
      .attr("class", 'reps')
      .style("fill", "rgb(255,255,255)")
      .selectAll("text")
      .data(parsedSamp[1])
      .enter()
      .append("text")
      .text(function(d) {
        return 'Reps: ' + d.reps;
      })
      .attr("x", function(d, i) {
        return xScale(i) + 75;
      })
      .attr("y", function(d) {
        return chartHeight ;
      });

    svg.append("g")
      .call(d3.svg.axis()
      .scale(xScale)
      .orient("bottom"));


};