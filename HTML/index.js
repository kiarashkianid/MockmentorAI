// Event listener for login form submission
/*The AuthController handles the login by takimg a JSON object ffrom the frontend containing a username and pasword
 and checking if the username and password matches values in the database and returns a success or failure message
* It also handles Registeration by accepting a user object from the frontend containing user details , process the user
data and returning a confirmation message with the username.
*/
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const data = { username: username, password: password };

    // Send the login data to the backend (Java API)
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send data as JSON
    })
        .then(response => response.json())
        .then(data => {
            console.log('Login Success:', data);
            // Handle response (e.g., redirect, display message, etc.)
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors (e.g., show error message)
        });
});

// Similar for the register form:
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const data = { username: username, password: password };

    // Send the registration data to the backend (Java API)
    fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send data as JSON
    })
        .then(response => response.json())
        .then(data => {
            console.log('Registration Success:', data);
            // Handle response (e.g., redirect, display message, etc.)
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors (e.g., show error message)
        });
});
