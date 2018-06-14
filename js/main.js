google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawAxisTickColors);

var tigercount = 0;
var hippocount = 0;
var monkeycount = 0;
var groups = 3;

function drawAxisTickColors() {
    
    if(groups == 3){
      var data = google.visualization.arrayToDataTable([
         ['Group', 'Count', { role: 'style' }],
         ['Tiger', tigercount, 'red'],
         ['Hippo', hippocount, 'blue'],
         ['Monkey',monkeycount,'green'],  
      ]);
    } else{
        var data = google.visualization.arrayToDataTable([
         ['Group', 'Count', { role: 'style' }],
         ['Tiger', tigercount, 'red'],
         ['Hippo', hippocount, 'blue'],  
      ]);
    }
    
      var options = {
         'legend':'none',
          vAxis:{format:'0'}
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data,options);
}

$(document).ready(function(){
    console.log("Document load event");
    
    // Sign in username and classname - no account required
    $('#Modal').modal('show');
    
    $("#tigerbutton").click(function(){
        tigercount++;
        drawAxisTickColors();
    });
    
    $("#hippobutton").click(function(){
        hippocount++;
        drawAxisTickColors();
    });
    
    $("#monkeybutton").click(function(){
        monkeycount++;
        drawAxisTickColors();
    });
    
    $("#addbehavior").click(function(){
        console.log("click event add behavior");
        var behavior = $("#inputBehavior").val();
        console.log(behavior);
        $("#listbehaviors").append("<li class='list-group-item'>"+behavior+"<i class='fas fa-trash float-right'></li>"); 
    });
    
    /*$("#listbehaviors i").click(function(){
       $(this).parent().remove(); 
    });*/
    
    $(document).on('click', '#listbehaviors i', function(){
        $(this).parent().remove();
    });
    
    $("#inputState").click(function(){
        var option = $("#inputState option:selected").text(); 
        console.log(option);
        if(option == "2 Groups (less than 20 students)"){
            $("#monkeybutton").hide();
            groups = 2;
            drawAxisTickColors();
        }else{
            $("#monkeybutton").show();
            groups = 3;
            drawAxisTickColors();
        }
    });
    
    $("#settings").click(function(){
        $("#settingsmenu").fadeToggle();
    })
    
    $("#user").click(function(){
         $('#Modal').modal('show'); 
    });
    
    $("#form").click(function(){
        window.open("evaluation.html");
    })
    
    $("#savebutton").click(function(){
         var username = $("#formGroupInput1").val();
         var classname = $("#formGroupInput2").val();
         $("title").text(username);
         $(".navbar-brand").html("<img src='assets/logo.svg' width='75' height='75' alt=''>Behavioral Management: "+classname);
    });
    
});



