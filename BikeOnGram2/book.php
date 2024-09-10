<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $bikeType = $_POST['bike'];
    $rentalDate = $_POST['rental-date'];
    $rentalDuration = $_POST['rental-duration'];
    $userName = $_POST['user-name'];
    $userEmail = $_POST['user-email'];

  
    $stmt = $conn->prepare("SELECT * FROM bikes WHERE name = ? AND available = 1");
    $stmt->bind_param("s", $bikeType);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $bike = $result->fetch_assoc();
        $totalCost = $rentalDuration * $bike['price'];

     
        $stmt = $conn->prepare("INSERT INTO bookings (bike_name, rental_date, rental_duration, user_name, user_email, total_cost) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssisss", $bikeType, $rentalDate, $rentalDuration, $userName, $userEmail, $totalCost);
        $stmt->execute();

      
        $stmt = $conn->prepare("UPDATE bikes SET available = 0 WHERE name = ?");
        $stmt->bind_param("s", $bikeType);
        $stmt->execute();

        echo "Booking Successful! Total Cost: $" . $totalCost;
    } else {
        echo "Bike is not available.";
    }

    $stmt->close();
    $conn->close();
}
?>
