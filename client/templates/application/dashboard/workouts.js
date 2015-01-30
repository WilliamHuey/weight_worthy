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
      dates = [],
      //Counting the exercises per one date
      datesCount = {};
  
  //console.log('raw data ', rawWorkoutData);

  for (var workouts in rawWorkoutData) {
    var workout = rawWorkoutData[workouts];        
    var createdAt = typeof workout.createdAt._d !== 'undefined'? 
        new Date(workout.createdAt._d) : workout.createdAt;

    var uniqDate = moment(createdAt).format("MMM-DDD-YYYY");

    if(dates.indexOf(uniqDate) == -1)
      dates.push(uniqDate);      
    
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

                  if(typeof datesCount[uniqDate] == 'undefined') {
                    datesCount[uniqDate] = 1;
                  } else {
                    datesCount[uniqDate] += 1;
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
    widthDivs = Math.round(chartWidth/7),
    heightDivFactor = 0.9,
    todaysDate = new Date();

  //Month header
  svg.append("text")
    .attr("transform", 
      "translate(" + chartWidth/7 + "," + heightDivs*heightDivFactor + ")")
    .text(moment(todaysDate).format("MMMM"))
    .style("font-weight", 900)
    .style("font-size", '125%');

  var days = svg.append("g").attr("class", "name-of-days"),
    daysOfWeek = ["Sun", "Mon", "Tue", 
    "Wed", "Thu", "Fri", "Sat"];

  //Create the rows
  _.each(daysOfWeek, function(v,i) {

    var xShift = (i + 2) * heightDivs * heightDivFactor;

    //Day labels on left for y-axis
    days
    .append("text")
    .text(v)
    .attr("transform", "translate(" + 25 + ", " + xShift +")");

  });

  //Use today as a reference point for what month to display
  //on the month
  var currentDate = moment(todaysDate),
    currentYear = moment(currentDate).format("YYYY"),
    currentMonth = moment(currentDate).format("MMM");

 // console.log('current date ', currentDate);
  //console.log('currentYear ', currentYear);
  //console.log('currentMonth ', currentMonth);

  //House the days grid
  var grid = svg.append("g").attr("class", "days"),
    marginLeftWeek = 70,
    dayStartCount = 1;

  //Tooltip when hovering over the days in the heatmap
  var toolTipDiv = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

  var attachToolTip = function(ele) {
    var $ele = $(ele[0]);

    ele.on("mouseover", function(d) {     
      toolTipDiv.transition()        
        .duration(100)      
        .style("opacity", .9);  
    
      //Use data attributes to get 
      //different exercises and day of month      
      
      var day = $ele.attr("data-day"),
        dayEnding = $ele.attr("data-dayEnding"),
        exerciseCount = $ele.data("exercises");

      var exerciseWord;
      //console.log('dayEnding ', dayEnding);
      if(exerciseCount > 1) {
        exerciseWord = 'exercises';
      } else {
        exerciseWord = 'exercise';
      }

      //Day where no workouts were committed
      if(typeof exerciseCount == 'undefined') {
        exerciseCount = 0;
        var eleClass = $ele.attr("class"),
          eleMonthYear = eleClass.split(" "),
          eleDate = eleMonthYear[0] + '/' + day + '/' + eleMonthYear[1],
          dayEnding = moment(new Date(eleDate)).format('Do').slice(-2);
      }

      //Create the message for the tooltip
      var toolTipMsg = ['<span>', exerciseCount, 
        exerciseWord, 'done on the', (day + dayEnding), 
        '</span>'].join(" ");        
        
      //Position the tooltip near the element 
      //being mousedover  
      toolTipDiv.html(toolTipMsg)  
        .style("left", (d3.event.pageX) + "px")     
        .style("top", (d3.event.pageY - 28) + "px");    
      });

     ele.on("mouseout", function(d) {       
      toolTipDiv.transition()        
        .duration(300)      
        .style("opacity", 0);   
    });
  };

  var rowMarkerHeight = 0,
    gridDayheight = 30; 

  //Five rows for each week of the month
  _.each(daysOfWeek, function(v,i) {  

    var xShift = (i + 2) * heightDivs * heightDivFactor;

    var gridRow = grid.append("g")
      .attr("class", daysOfWeek[i]);

    var dayWidth = (chartWidth/2)/15,
      weekWidthSpace = 5,
      weekCount = 1,
      dayInc = 0;

    //Create each day for a given day of week 
    //(ex. all days for Sunday)
    while(weekCount < 6) {

      var laterWeeksLength = marginLeftWeek + 
        ((weekCount - 1) * (dayWidth + weekWidthSpace));
      
      var dayRect = gridRow
        .append("rect")
        .attr("width", dayWidth)
        .attr("height", gridDayheight)
        .attr("transform",
          "translate(" + laterWeeksLength + 
            ", " + (xShift - 18) +")")
        .style("stroke-width", 1)
        .style("stroke", "gray")
        .style("fill", "transparent")
        .attr("class", (currentMonth + " " + currentYear))
        .attr("data-day", (dayStartCount + (dayInc * 7)));

      //Event listener attachment for each day
      attachToolTip(dayRect);

      dayInc++;        
      weekCount++;
    }

    rowMarkerHeight = (xShift - 18);

    dayStartCount++;     
  });

  //Year label
  svg.append("text")
    .attr("transform", 
      "translate(" + chartWidth/7 + "," + (rowMarkerHeight + gridDayheight + 30) + ")")
    .text(moment(todaysDate).format("YYYY"))
    .style("font-weight", 900)
    .style("font-size", '125%');

  //Get name of the first day of month from given date of month
  var dayOfMonth = moment(currentDate).format('DD'),
    firstDateOfMonth = moment(currentDate)
      .subtract(dayOfMonth - 1, 'days');

  var nameFirstDayOfMonth = moment(firstDateOfMonth)
    .format('ddd');

  var startRow = daysOfWeek.indexOf(nameFirstDayOfMonth),
    lastDayOfMonth = moment(currentDate).endOf('month'),
    nameOfLastDayOfMonth = lastDayOfMonth.format("ddd"),
    endRow = daysOfWeek.indexOf(nameOfLastDayOfMonth),
    numDaysInMonth = lastDayOfMonth.format('DD');
 
  var $gDays = $('g.days'),
    $gDaysChildren = $gDays.children();

  //Hide the beginning days only if first day of
  //month does not start on a Sunday
  if(startRow != 0) {
    $gDaysChildren.slice(0,startRow)
    .each(function() {
      $(this).children().first().hide();
    });
  }

  //Hide the ending days only if the last days
  //does not land on a Sat or the month is Feb
  var diffEndDays = 35 - numDaysInMonth;  

  if(((numDaysInMonth > 28) && (endRow != 6))) {
    $gDaysChildren.slice(endRow + 1, 7)
      .each(function() {
        $(this).children().last().hide();
    });
  } else if(!(numDaysInMonth > 28)){
    $gDaysChildren.slice(0, 7)
      .each(function() {
        $(this).children().last().hide();
    });
  }

  //Change the numbering of days
  //if the start of the month does not start 
  //on a Sunday
  if(startRow != 0) {
    $gDaysChildren.each(function() {
      $(this).children().each(function() {
        var newDay = $(this).data("day");
        $(this).attr("data-day", (newDay - startRow));
      });
    });
  }

  //Heatmap color gradiations
  var heatMapColors = ['#b2e2e2', 
    '#66c2a4', '#2ca25f', '#006d2c'],
    heatMapLevels = [1, 2, 3, 4];

  //Highlight the individual days where workouts occurred
  //Adding the day and exercise count as using the data attr
  for(var i = 0; i < dataSet[0].length; i++) {
    var dateOfWorkout = dataSet[0][i].createdAt,
      mDateOfWorkout = moment(dateOfWorkout);

    var rectDay = mDateOfWorkout.format("D"),
      rectDayEnding = mDateOfWorkout.format("Do").slice(-2),
      rectMonth = mDateOfWorkout.format("MMM"),
      rectYear = mDateOfWorkout.format("YYYY"),
      rectDate = rectMonth + "-" + rectDay + "-" + rectYear,
      excercisesCount = datesCount[rectDate],
      rectColor = heatMapColors[heatMapLevels.indexOf(excercisesCount)];

    $('rect[data-day=' + rectDay
      + "]" + "." + rectMonth
       + "." + rectYear)
    .css({ "fill": rectColor})
    .attr("data-exercises", excercisesCount)
    .attr("data-dayEnding", rectDayEnding);
  }
  
};