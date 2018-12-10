<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "uttec";

//Public variables for student login including the student code identifier and unique session identifier
//public $student_code ='';
//public $usv =''; 

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";

$timestamp = $_POST["logtimestamp"];
$timer = $_POST["logtimer"];
$counter = $_POST["logcounter"];
$webpage = $_POST["logwebpage"];
$label = $_POST["loglabel"];

$sql = "INSERT INTO logtracedata (timestamp, timer, counter, webpage, label)
VALUES ('$timestamp', '$timer', '$counter', '$webpage', '$label')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>