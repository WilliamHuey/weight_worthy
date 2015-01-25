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
    var createdAt = typeof workout.createdAt._d !== 'undefined'? 
        new Date(workout.createdAt._d) : workout.createdAt;

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
                    weight: details.weight,
                    weightInputId: details.weightInputId,
                    createdAt: createdAt
                  };
                  var item2 = {
                    x: setCount,
                    y: details.reps,
                    title: title,
                    exerciseId: exerciseId,
                    reps: details.reps,
                    repsInputId: details.repsInputId,
                    createdAt: createdAt
                  };
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

  var margin = {
    top: 20, right: 20, bottom: 60, left: 20
  };  

  var $chart = $('#chart'),
    chartWidth = $chart.width(),
    chartHeight = $chart.height();

  var svg = d3.select("#chart").append("svg")   
  .attr("width", chartWidth)
  .attr("height", chartHeight);

  //Separate space evenly for height and width in svg
  //Taking into account that the heatmap will
  //is going to be 7 x 5 grid
  //Extra div for the labels such as for dates and month
  var heightDivs = Math.round(chartHeight/9),
    widthDivs = Math.round(chartWidth/7);

  var heightDivFactor = 0.9

  //Month header
  svg.append("text")
    .attr("transform", 
      "translate(" + chartWidth/7 + "," + heightDivs*heightDivFactor + ")")
    .text(moment(new Date()).format("MMMM"));

  var days = svg.append("g");

  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  
  //Create the rows
  _.each(daysOfWeek, function(v,i) {

    var xShift = (i + 2)*heightDivs*heightDivFactor;

    //Day labels on left for y-axis
    days
    .append("text")
    .text(v)
    .attr("transform", 
      "translate(" + 25 + ", " + xShift +")");
  });

  //House the grid
  var grid = svg.append("g").attr("class", "days"),
  marginLeftWeek = 70;

  //Five rows for each day of week
  _.each(daysOfWeek, function(v,i) {  

    var xShift = (i + 2)*heightDivs*heightDivFactor;

    var gridRow = grid.append("g").attr("class", daysOfWeek[i]);

    var dayWidth = (chartWidth/2)/15,
    weekWidthSpace = 5;

    var weekCount = 1;
    while(weekCount < 6) {

      var laterWeeksLength = marginLeftWeek + ((weekCount - 1) * (dayWidth + weekWidthSpace));
      
      gridRow
        .append("rect")
        .attr("width", dayWidth)
        .attr("height", 30)
        .attr("transform",
          "translate(" + laterWeeksLength + ", " + (xShift - 18) +")")
        .style("stroke-width", 1)
        .style("stroke", "gray")
        .style("fill", "none");
      
      weekCount++;
    }      

  });

  //Get name of the first day of month from given date of month

  var currentDate = new Date();

  var dayOfMonth = moment(currentDate).format('DD');

  var firstDateOfMonth = moment()
    .subtract(dayOfMonth - 1, 'days')
    .calendar();

  var nameFirstDayOfMonth = moment(new Date(firstDateOfMonth))
    .format('ddd');

  var startRow = daysOfWeek.indexOf(nameFirstDayOfMonth);

  var lastDayOfMonth = moment(currentDate).endOf('month');

  var numDaysInMonth = lastDayOfMonth.format('DD');

  //Hide the beginning days
  $('g.days g:lt(' + startRow +')').each(function() {
    $(this).children().first().hide();
  });

  //Hide the ending days
  $('g.days g:gt(' + (35 - numDaysInMonth) +')').each(function() {
    console.log($(this).children().last());
    $(this).children().last().hide();
  });
  












  

 


};