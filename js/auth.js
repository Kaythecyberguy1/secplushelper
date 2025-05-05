// Simple localStorage-based authentication (demo only)

document.addEventListener('DOMContentLoaded', function () {
    // Sign Up
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            const errorDiv = document.getElementById('signup-error');
            if (!email || !password) {
                errorDiv.textContent = 'Please fill in all fields.';
                return;
            }
            if (localStorage.getItem('user_' + email)) {
                errorDiv.textContent = 'User already exists.';
                return;
            }
            localStorage.setItem('user_' + email, JSON.stringify({ email, password, progress: {} }));
            errorDiv.textContent = '';
            alert('Sign up successful! You can now log in.');
            window.location.href = 'login.html';
        });
    }

    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const errorDiv = document.getElementById('login-error');
            const userData = localStorage.getItem('user_' + email);
            if (!userData) {
                errorDiv.textContent = 'User not found.';
                return;
            }
            const user = JSON.parse(userData);
            if (user.password !== password) {
                errorDiv.textContent = 'Incorrect password.';
                return;
            }
            errorDiv.textContent = '';
            localStorage.setItem('loggedInUser', email);
            alert('Login successful!');
            window.location.href = 'profile.html';
        });
    }
}); 