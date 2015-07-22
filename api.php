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


// acciones api

if($_GET['action'] == 'read'){

	$sql = "SELECT name, status,id FROM tasks";

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
      $rowId = $row['id'];


		$data[] = array(
        'name' => $rowName,
        'status' => $rowStatus,
        'id' => $rowId
    );
	}


	echo json_encode($data);


}



if($_GET['action'] == 'insert'){

	/*
	** Do a insert query:
	*/

  $task = $_GET['name'];
  //$status = $_GET['status'];

	// create SQL query:
	$sql = "INSERT INTO tasks (name, status) VALUES ( '$task' , 0)";

	// execute query:
	$result = mysql_query($sql) or die('A error occured: ' . mysql_error());

	// get the new ID of the last insert command
	$new_id = mysql_insert_id();

	echo json_encode(array('result' => true ,'id' => $new_id));
}


if($_GET['action'] == 'update'){


  $status = ($_GET['status'] == 'true') ? 1 : 0;



//  echo $status;

  $id = $_GET['id'];

  $sql = "UPDATE tasks SET status=".$status." WHERE id = $id";

  // execute query:
  $result = mysql_query($sql) or die('A error occured: ' . mysql_error());



  /*
  ** Do a delete query:
  */

  // create SQL query:
  //$sql = "DELETE FROM logs WHERE id='1'";

  // execute query:
//  $result = mysql_query($sql) or die('A error occured: ' . mysql_error());

  echo json_encode(array('result' => $result ,'id' => $id));


}


// /*
// ** Do a update query:
// */

// // create SQL query:
// $sql = "UPDATE logs SET text='New text!' WHERE id='1'";

// // execute query:
// $result = mysql_query($sql) or die('A error occured: ' . mysql_error());



// /*
// ** Do a delete query:
// */

// // create SQL query:
// $sql = "DELETE FROM logs WHERE id='1'";

// // execute query:
// $result = mysql_query($sql) or die('A error occured: ' . mysql_error());



 ?>
