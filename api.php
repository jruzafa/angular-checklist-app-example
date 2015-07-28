<?php


header('Content-Type: application/json');

// Variables to connection mysql
$user = "zend";
$host = "localhost";
$password = "";
$database = "checklistapp";

/*
** Connect to database:
*/

// connect to the database
$con = mysql_connect($host, $user, $password)
    or die('Could not connect to the server!');

// select a database:
mysql_select_db($database)
    or die('Could not select a database.');


// Actions api


// read tasks
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

// create new task
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

// update action, name and status
if($_GET['action'] == 'update'){

  $status = ($_GET['status'] == 'true') ? 1 : 0;

  $id = $_GET['id'];

  $sql = "UPDATE tasks SET status=".$status." WHERE id = $id";

  // execute query:
  $result = mysql_query($sql) or die('A error occured: ' . mysql_error());

  echo json_encode(array('result' => $result ,'id' => $id));

}

// delete action
if($_GET['action'] == 'delete'){

  $id = $_GET['id'];

  $sql = "DELETE FROM tasks WHERE id = $id";

  // execute query:
  $result = mysql_query($sql) or die('A error occured: ' . mysql_error());

  echo json_encode(array('result' => $result ,'id' => $id));

}

?>
