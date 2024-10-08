document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        // Save JWT token in localStorage
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        // Redirect or load the task management page here
    } else {
        alert('Login failed: ' + data.message);
    }
});
