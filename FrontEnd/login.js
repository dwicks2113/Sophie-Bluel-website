//Login Page Authentication
document.addEventListener("DOMContentLoaded", function() {
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    //validatae email and password
    if(!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if(!validatePassword(password)) 
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
        return;    
});

    const payload = {
      email: email,
      password: password
    };

  fetch('http://localhost:5678/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      if(data.token) {
        
        localStorage.setItem('token', data.token);
        console.log('Login successful. Token stored in local storage.')

        window.location.href = 'index.html';
       } else {
        alert('login failed: ' + (data.message || 'Unknown error'));
       }
    })
    .catch(error => {
      console.error('Error: ', error);
      alert('Login failed: ' + error.message);
    });
  });
  
  //validate email
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  //validate password
  function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
  }


