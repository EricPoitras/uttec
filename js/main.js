google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawAxisTickColors);

var tigercount = 0;
var hippocount = 0;

function drawAxisTickColors() {
      var data = google.visualization.arrayToDataTable([
         ['Group', 'Count', { role: 'style' }],
         ['Tiger', tigercount, 'red'],
         ['Hippo', hippocount, 'blue'],            
      ]);
    
      var options = {
         'legend':'none',
          vAxis:{format:'0'}
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data,options);
    }

$(document).ready(function(){
    console.log("Document load event");
    
    $("#tigerbutton").click(function(){
        tigercount++;
        drawAxisTickColors();
    });
    
    $("#hippobutton").click(function(){
        hippocount++;
        drawAxisTickColors();
    });
})