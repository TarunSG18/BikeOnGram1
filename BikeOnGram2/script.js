
const bikes = [
    { id: 1, name: 'Mountain Bike', price: 15, available: true },
    { id: 2, name: 'Road Bike', price: 12, available: true },
    { id: 3, name: 'Electric Bike', price: 20, available: true }
  ];
  

  document.querySelector('.booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const bikeType = document.querySelector('#bike').value;
    const rentalDate = document.querySelector('#rental-date').value;
    const rentalDuration = document.querySelector('#rental-duration').value;
    const userName = document.querySelector('#user-name').value;
    const userEmail = document.querySelector('#user-email').value;
  
    if (!bikeType || !rentalDate || !rentalDuration || !userName || !userEmail) {
      alert('Please fill out all fields!');
      return;
    }
  
    const bike = bikes.find(bike => bike.name.toLowerCase().includes(bikeType.toLowerCase()));
  
    if (!bike || !bike.available) {
      alert('This bike is currently unavailable.');
      return;
    }
  
  
    alert(`
      Booking Successful!
      Name: ${userName}
      Email: ${userEmail}
      Bike: ${bike.name}
      Rental Date: ${rentalDate}
      Duration: ${rentalDuration} days
      Total Cost: $${rentalDuration * bike.price}
    `);
  

    bike.available = false;
  
    document.querySelector('#bike').value = '';
    document.querySelector('#rental-date').value = '';
    document.querySelector('#rental-duration').value = '';
    document.querySelector('#user-name').value = '';
    document.querySelector('#user-email').value = '';
  });
  
 
  document.querySelector('.contact-section form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
  
    if (!name || !email || !message) {
      alert('Please fill out all fields!');
      return;
    }
  
 
    alert(`Thank you for reaching out, ${name}! We will get back to you at ${email}.`);
  
 
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#message').value = '';
  });
  