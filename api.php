<?php 
header('Content-Type: application/json');

/*
** Connect to database:
*/
 
// connect to the database
$con = mysql_connect('localhost','zend','') 
    or die('Could not connect to the server!');
 
// select a database:
mysql_select_db('checklistapp') 
    or die('Could not select a database.');
 

if($_GET['action'] == 'read'){

	$sql = "SELECT name, status FROM tasks";
	 
	// execute query:
	$result = mysql_query($sql) 
	    or die('A error occured: ' . mysql_error());
	 
	// get result count:
	$count = mysql_num_rows($result);
	// print "Showing $count rows:<hr/>";
	 
	$data = array();

	// fetch results:
	while ($row = mysql_fetch_assoc($result)) {
	    $rowName = $row['name'];
	    $rowStatus = $row['status'];
	 
		$data[] = array('name' => $rowName, 'status' => $rowStatus); 
	}
	

	echo json_encode($data);

}





 ?>