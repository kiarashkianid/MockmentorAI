document.getElementById("loginForm").addEventListener("submit", function() {
    

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // document.getElementById("loginMessage").innerText = `Logging in with username: ${username} and password: ${password}`;

    console.log(`*** Saved information ***`);
    console.log(`==========================`);
    console.log(`Name : ${username}`);
    console.log(`password : ${password}`);
    console.log(`==========================`);
});

document.getElementById("registerForm").addEventListener("submit", function() { 

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    console.log(`*** Saved information ***`);
    console.log(`==========================`);
    console.log(`Name : ${username}`);
    console.log(`password : ${password}`);
    console.log(`==========================`);
});
