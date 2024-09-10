<?php
session_start();


$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "user_login_db";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$user_input = $_POST['username'];
$pass_input = $_POST['password'];


$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $user_input);
$stmt->execute();
$stmt->store_result();

$password = 'password';
$hashed_password = password_hash($password, PASSWORD_BCRYPT);
echo $hashed_password; 



if ($stmt->num_rows > 0) {
   
    $stmt->bind_result($hashed_password);
    $stmt->fetch();
    

    if (password_verify($pass_input, $hashed_password)) {
        $_SESSION['loggedin'] = true;
        header('Location: dashboard.php');
        exit;
    } else {
        echo '<p style="color: red; text-align: center;">Invalid password</p>';
    }
} else {
    echo '<p style="color: red; text-align: center;">Invalid username</p>';
}


$stmt->close();
$conn->close();
?>
