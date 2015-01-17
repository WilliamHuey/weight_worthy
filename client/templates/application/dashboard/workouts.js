Template.workouts.rendered = function() {
  var rawWorkoutData = Workouts.find({
    userId: Meteor.userId()
  }).fetch();

  var dataSet = [
      [],
      []
    ],
    setCount = 0;

  for (var workouts in rawWorkoutData) {
    var workout = rawWorkoutData[workouts];
    for (var exercises in workout) {
      if (exercises == 'title') {
        var title = workout[exercises];
      }
      if (typeof workout[exercises] == 'object') {
        var exercise = workout[exercises];

        for (var sets in exercise) {
          if (typeof exercise[sets] == 'object') {
            var set = exercise[sets];
            for (var setInfo in set) {
              if (setInfo == 'exerciseId') {
                var exerciseId = set[setInfo];
              }
              if (typeof set[setInfo] == 'object') {
                var entryDetails = set[setInfo];
                for (var entryDetail in entryDetails) {
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
                  dataSet[0].push(item1);
                  dataSet[1].push(item2);
                  setCount++;
                }
              }
            }
          }
        }
      }
    }
  }

  var $chart = $('#chart'),
    chartWidth = $chart.width(),
    chartHeight = $chart.height(),
    stack = d3.layout.stack(),
    colors = d3.scale.category10();

  stack(dataSet);

  var svg = d3.select("#chart").append("svg");

  var yScale = d3.scale.linear()
    .domain([0,
      d3.max(dataSet, function(d) {
        return d3.max(d, function(d) {
          return d.y0 + d.y;
        });
      })
    ])
    .range([0, chartHeight]);

  //Beginning date range
  var dateRange = [{
    "date": "2015-01-12"
  }, {
    "date": "2015-01-18"
  }];

  var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  };

  var xScale = d3.time.scale()
    .domain([new Date(dateRange[0].date), d3.time.day.offset(new Date(dateRange[dateRange.length - 1].date), 1)])
    .rangeRound([0, chartWidth]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(d3.time.days, 1)
    .tickFormat(d3.time.format('%a %d'))
    .tickSize(0)
    .tickPadding(8);

  var groups = svg.selectAll("g")
    .data(dataSet)
    .enter()
    .append("g")
    .style("fill", function(d, i) {
      return colors(i);
    });

  var xDateAxis = svg.append('g')
    .attr('class', 'x axis')
    .attr('width', chartWidth)
    .call(xAxis);

  var dateAxisLabelCount = xDateAxis[0][0]
    .textContent.split(" ").length - 1;

  var xDateSpace = Math.floor(chartWidth / dateAxisLabelCount);

  var rects = groups.selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xScale(new Date(d.title.split(" - ")[1])) - xDateSpace;
    })
    .attr("y", function(d) {
      return chartHeight - yScale(d.y0) - yScale(d.y);
    })
    .attr("height", function(d) {
      return yScale(d.y);
    })
    .attr("width", 30);

  svg
    .append("g")
    .attr("class", 'weight')
    .style("fill", "rgb(255,255,255)")
    .selectAll("text")
    .data(dataSet[0])
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
    .data(dataSet[1])
    .enter()
    .append("text")
    .text(function(d) {
      return 'Reps: ' + d.reps;
    })
    .attr("x", function(d, i) {
      return xScale(i) + 75;
    })
    .attr("y", function(d) {
      return chartHeight;
    });


};