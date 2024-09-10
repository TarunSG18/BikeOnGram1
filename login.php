<?php
session_start();


$valid_username = 'admin';
$valid_password = 'password';


$username = $_POST['username'];
$password = $_POST['password'];


if ($username === $valid_username && $password === $valid_password) {
  
    $_SESSION['loggedin'] = true;
    header('Location: dashboard.php');
} else {
  
    echo '<p style="color: red; text-align: center;">Invalid username or password</p>';
}
?>
