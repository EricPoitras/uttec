// Data logged for research purposes - stored in server, not retrieved...

// Variables
var logdata;

var docurl = '';
var d = '';
var n = '';

var docheight = '';
var docwidth = '';
var deviceheight = '';
var devicewidth = '';
var bodyheight = '';
var bodywidth = '';
var pagexoffset = '';
var pageyoffset = '';

var counter = 0;
var timer = 0;

// Functions

//Session identifier
function setsessionid(){
    if (sessionStorage.getItem("sessionid") === null) {
        var sessionid = Math.floor(Math.random()*1000000000001);
        sessionStorage.sessionid = sessionid;
    } 
}

//Setting document url
function setvariables(){
    //Get document url
    docurl = document.URL;
    //Get timestamp
    d = new Date();
    n = d.toUTCString();
}

//Setting screen variables
function setscreenvariables(){
    //Viewport size
    docheight = document.documentElement.clientHeight;
    docwidth = document.documentElement.clientWidth;
    //Device size
    deviceheight = window.screen.height;
    devicewidth = window.screen.width;
    //Document size
    bodyheight = document.body.clientHeight;
    bodywidth = document.body.clientWidth;
    //Pixel number scrolled from upper left corner of the document, horizontally and vertically
    pagexoffset = window.pageXOffset;
    pageyoffset = window.pageYOffset;
}

//Counter of logged events
function incrementcounter(){
    //Set counter
    counter += 1;
}

function settimer(){
    timer += 0.1;
}

setInterval("settimer()", 100);

function refreshloggervalues(){
    setsessionid();
    setvariables();
    setscreenvariables();
    incrementcounter();
}

// Data Logging Function
function datalogger(categorylabel, eventlabel, qualifierlabel){
    
    var newitem = {
        session: sessionStorage.sessionid,
        username: localStorage.UTTECusername,
        timestamp: n,
        timer: timer,
        counter: counter,
        page: docurl,
        docheight: docheight,
        docwidth: docwidth,
        deviceheight: deviceheight,
        devicewidth: devicewidth,
        bodyheight: bodyheight,
        bodywidth: bodywidth,
        pagexoffset: pagexoffset,
        pageyoffset: pageyoffset,
        category: categorylabel,
        event: eventlabel, 
        qualifier: qualifierlabel
    };
    
    localStorage.sessionlog = JSON.stringify(newitem);
    
    // Log research data to MySQL database - lab evaluation EP 11 10 2018
    $.post("admin/researchlog.php",{logtimestamp: n, logtimer: timer, logcounter: counter, logwebpage: docurl, loglabel: JSON.stringify(newitem)});
    
}

// Event Handlers

$(window).on("load",function(){
    refreshloggervalues();
    datalogger("NavigationEvent","DocumentLoad","N/A");
});

$(window).on("unload",function(){
    refreshloggervalues();
    datalogger("NavigationEvent","DocumentUnload","N/A");
});

$(document).on("click","button, a, textarea",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).prop('nodeName');
    refreshloggervalues();
    datalogger("ClickEvent",elementdescription,elementType);
});

$(document).on("dblclick","button, a, textarea",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).prop('nodeName');
    refreshloggervalues();
    datalogger("DBLClickEvent",elementdescription,elementType);
});

$(document).on("click","input",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).attr('id');
    refreshloggervalues();
    datalogger("ClickEvent",elementdescription,elementType);
});

$(document).on("dblclick","input",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).attr('id');
    refreshloggervalues();
    datalogger("DBLClickEvent",elementdescription,elementType);
});

$(document).on("touchstart","button, a, input, textarea",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).prop('nodeName');
    refreshloggervalues();
    datalogger("TouchStart",elementdescription,elementType);
});

$(document).on("touchend","button, a, input, textarea",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).prop('nodeName');
    refreshloggervalues();
    datalogger("TouchEnd",elementdescription,elementType);
});

$(document).on("touchstart","input",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).attr('id');
    refreshloggervalues();
    datalogger("TouchStart",elementdescription,elementType);
});

$(document).on("touchend","input",function(){
    var element = $(this).html().replace(/\r?\n|\r|\s|["']/g,"");
    var elementdescription = element.substring(0,500);
    var elementType = $(this).attr('id');
    refreshloggervalues();
    datalogger("TouchEnd",elementdescription,elementType);
});

$(document).on("change paste keyup","textarea, input",function(){
    var elementvalue = $(this).val();
    //var elementdescription = elementvalue.toString().substring(0,500);
    var elementcontent = $(this).prop('nodeName');
    refreshloggervalues();
    datalogger("InputEvent",elementvalue,elementcontent);
});
