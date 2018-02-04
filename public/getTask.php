<?php

include("connection.php");

$sql = "SELECT * FROM liste";
$result = mysqli_query($con,$sql);

$array = array();
while ($row = mysqli_fetch_array($result)) {
	array_push($array, array($row["id"], $row["libelle"]));
}
echo json_encode($array);

?>
