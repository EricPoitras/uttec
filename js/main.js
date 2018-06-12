google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawAxisTickColors);

function drawAxisTickColors() {
      var data = google.visualization.arrayToDataTable([
         ['Group', 'Count', { role: 'style' }],
         ['Tiger', 25, 'red'],
         ['Hippo', 10, 'blue'],            
      ]);
    
      var options = {
         'legend':'none',
          vAxis:{format:'0'}
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data,options);
    }