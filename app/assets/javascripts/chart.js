  var showChart = function(incorrectStrokes){
    var keysSorted = Object.keys(incorrectStrokes).sort(function(a,b){return incorrectStrokes[b]-incorrectStrokes[a]})
    var labels = [];
    var data = [];
    for (var i = 0; i <= 5; i++) {
      labels.push(String.fromCharCode(keysSorted[i]))
      data.push(incorrectStrokes[keysSorted[i]])
    };

    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
        labels: labels,
        datasets: [
            {
                label: "Most missed letters",
                fillColor: "rgba(91,41,113,0.5)",
                strokeColor: "rgba(91,41,113,0.8)",
                highlightFill: "rgba(91,41,113,0.75)",
                highlightStroke: "rgba(91,41,113,1)",
                data: data
            }
        ]
    };

    var options = {
    scaleBeginAtZero : true,
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    barShowStroke : true,
    barStrokeWidth : 2,
    barValueSpacing : 5,
    barDatasetSpacing : 1,
    scaleFontSize: 16,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  }
    if (labels.length > 0){
      var missedLettersChart = new Chart(ctx).Bar(data, options);
    }
  }
