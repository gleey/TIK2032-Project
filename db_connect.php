<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'artikel';

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Database connection file loaded successfully!"; // Debug line
?>
