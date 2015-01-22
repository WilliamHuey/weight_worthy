Template.workouts.rendered = function() {
  var rawWorkoutData = Workouts.find({
    userId: Meteor.userId()
  }).fetch();

  var dataSet = [
      [],
      []
    ],
    setCount = 0;
  
  var startDate = null,
      endDate = null,
      dates = [];
  
  //console.log('raw data ', rawWorkoutData);  

  for (var workouts in rawWorkoutData) {
    var workout = rawWorkoutData[workouts];        
    //console.log('ca ', workout.createdAt);
    //if(workout.createdAt._i || workout.createdAt)
    var createdAt = workout.createdAt._i ? 
        new Date(workout.createdAt._i) : workout.createdAt;
    //var createdAt = new Date(workout.createdAt._i);
    //console.log('created at ', workout.createdAt);
    
    dates.push(createdAt);
    
    if(!startDate || createdAt < startDate)
      startDate = createdAt;
    
    if(!endDate || createdAt > endDate)
      endDate = createdAt;
    
    for (var exercises in workout) {
      if (exercises == 'title') {
        var title = workout[exercises];
      }
      if (typeof workout[exercises] == 'object' && 
          workout[exercises].length > 0) {
        var exercise = workout[exercises];
        //console.log('exercise is ', exercise);

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
                  //console.log('details weight ', details.weight);
                  //console.log('created at ', workout.createdAt._i);
                  //console.log('title ', title);
                  var item1 = {
                    x: setCount,
                    y: details.weight,
                    title: title,
                    exerciseId: exerciseId,
                    weight: details.weight,
                    createdAt: createdAt
                  };
                  var item2 = {
                    x: setCount,
                    y: details.reps,
                    title: title,
                    exerciseId: exerciseId,
                    reps: details.reps,
                    createdAt: createdAt
                  };
                  dataSet[0].push(item1);
                  dataSet[1].push(item2);
                  //console.log('item 1 is ', item1);
                  //console.log('2item  is ', item2);
                  setCount++;
                }
              }
            }
          }
        }
      }
    }
  }

  var margin = {top: 20, right: 20, bottom: 60, left: 20};
  
  //console.log(dates);

  var $chart = $('#chart'),
    totalWidth = $chart.width()
    chartWidth = totalWidth,
    totalHeight = $chart.height(),
    chartHeight = totalHeight,
    stack = d3.layout.stack(),
    colors = d3.scale.category10();

  stack(dataSet);
  
  //console.log('dataset ', JSON.stringify(dataSet));

  //console.log('datesForXAxis ', datesForXAxis);

  var svg = d3.select("#chart").append("svg")   
  .attr("width", totalWidth)
  .attr("height", totalHeight)

  var yScale = d3.scale.linear()
    .domain([0,
      d3.max(dataSet, function(d) {
        return d3.max(d, function(d) {
           //console.log('d y ' +  d.y0 + " , dy " + d.y);
          return d.y0 + d.y;
        });
      })
    ])
    .range([0, chartHeight]);

  //Beginning date range
  //console.log("startDate:", startDate);
  //console.log("endDate:", endDate);
  //console.log(dates);

  var xTicks = [ d3.time.day.offset(dates[0], - 1),
             d3.time.day.offset(dates[dates.length - 1], 1)];
  //console.log('xticks ', xTicks);
  var xScale = d3.time.scale()
    .domain(xTicks)
    .rangeRound([0, chartWidth]);
  
  //console.log('xscale ', xScale);
  
  var groups = svg.selectAll("g")
    .attr('class', 'groups')    
    .data(dataSet)
    .enter()
    .append("g")
    .style("fill", function(d, i) {
      return colors(i);
    });

  var rects = groups.selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {      
      return xScale(d.createdAt);
    })
    .attr("y", function(d) {
      
      return chartHeight - yScale(d.y0) - yScale(d.y);
    })
    .attr("height", function(d) {
      //console.log('d is ', JSON.stringify(d));
      return yScale(d.y);
    })
    .attr("width", 30);

  var labelXTickOffset = 37; 

  svg
    .append("g")
    .attr("class", 'date')
    .selectAll("text")    
    .data(dataSet[0])
    .enter()
    .append("text")
    .text(function(d) {
      //console.log('d ', d);
      return d3.time.format('%a %d')(d.createdAt);
    })
    .attr("x", function(d, i) {
      return xScale(d.createdAt) + labelXTickOffset;
    })
    .attr("y", function(d) {
      return 35;
    })
    .style("text-anchor", "end")

    svg
    .append("g")
    .attr("class", 'weight')
    .selectAll("text")    
    .data(dataSet[0])
    .enter()
    .append("text")
    .text(function(d) {
      //console.log('d ', d);
      return 'Weight: ' + d.weight;
    })
    .attr("x", function(d, i) {
      return xScale(d.createdAt) + labelXTickOffset;
    })
    .attr("y", function(d) {
      return chartHeight;
    })
    .style("text-anchor", "end")
       
       

  // svg
  //   .append("g")
  //   .attr("class", 'reps')
  //   .style("fill", "rgb(255,255,255)")
  //   .selectAll("text")
  //   .data(dataSet[1])
  //   .enter()
  //   .append("text")
  //   .text(function(d) {
  //     return 'Reps: ' + d.reps;
  //   })
  //   .attr("x", function(d, i) {
  //     return xScale(d.createdAt);
  //   })
  //   .attr("y", function(d) {
  //     return chartHeight;
  //   });


};