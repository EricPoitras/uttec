google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawAxisTickColors);

var tigercount = 0;
var hippocount = 0;
var monkeycount = 0;
var groups = 3;
var username;
var classname;

function setdatafromlocalstorage(){
    if (localStorage.getItem("username") !== null) {
        // Code for localStorage/sessionStorage.
        console.log("Connection to local storage established...");
        tigercount = parseInt(localStorage.tigercount);
        hippocount =  parseInt(localStorage.hippocount);
        monkeycount = parseInt(localStorage.monkeycount);
        groups = parseInt(localStorage.groups);
        username = localStorage.username;
        classname = localStorage.classname;
        
        $("#formGroupInput1").val(username);
        $("#formGroupInput2").val(classname);
         $("title").text(username);
         $(".navbar-brand").html("<img src='assets/logo.svg' width='75' height='75' alt=''>Behavioral Management: "+classname);
        
        
    } else {
        // Sorry! No Web Storage support..
        console.log("Connection to local storage is not available...");
        tigercount = 0;
        hippocount = 0;
        monkeycount = 0;
        groups = 3;
        username = "";
        classname = "";
    }
}

function updatelocalstorage(){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        console.log("Connection to local storage established...");
        localStorage.tigercount = tigercount;
        localStorage.hippocount = hippocount;
        localStorage.monkeycount = monkeycount;
        localStorage.groups = groups;
        localStorage.username = username;
        localStorage.classname = classname;
    } else {
        // Sorry! No Web Storage support..
        console.log("Connection to local storage is not available...")
    }
}

function clearlocalstorage(){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        console.log("Connection to local storage established...");
        localStorage.removeItem("tigercount");
        localStorage.removeItem("hippocount");
        localStorage.removeItem("monkeycount");
        localStorage.removeItem("groups");
        localStorage.removeItem("username");
        localStorage.removeItem("classname");
        console.log("Local storage is cleared...");
    } else {
        // Sorry! No Web Storage support..
        console.log("Connection to local storage is not available...")
    }
}

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
    
    setdatafromlocalstorage();
    
    // Sign in username and classname - no account required
    $('#Modal').modal('show');
    
    $("#tigerbutton").click(function(){
        tigercount++;
        drawAxisTickColors();
        updatelocalstorage();
    });
    
    $("#hippobutton").click(function(){
        hippocount++;
        drawAxisTickColors();
        updatelocalstorage();
    });
    
    $("#monkeybutton").click(function(){
        monkeycount++;
        drawAxisTickColors();
        updatelocalstorage();
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
            updatelocalstorage();
        }else{
            $("#monkeybutton").show();
            groups = 3;
            drawAxisTickColors();
            updatelocalstorage();
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
         username = $("#formGroupInput1").val();
         classname = $("#formGroupInput2").val();
         $("title").text(username);
         $(".navbar-brand").html("<img src='assets/logo.svg' width='75' height='75' alt=''>Behavioral Management: "+classname);
         updatelocalstorage();
    });
    
    $("#clearbutton").click(function(){
         username = "";
         $("#formGroupInput1").val(username);
         classname = "";
         $("#formGroupInput2").val(classname);
         $("title").text(username);
         $(".navbar-brand").html("<img src='assets/logo.svg' width='75' height='75' alt=''>Behavioral Management: "+classname);
         clearlocalstorage();
         location.reload();
        
    });
    
    $("#closebutton, .close").click(function(){
         drawAxisTickColors(); 
    });
    
});



