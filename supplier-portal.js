// supplier-portal.js - Supplier Portal Login Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const isLoggedIn = sessionStorage.getItem('supplierLoggedIn');
    if (isLoggedIn) {
        // Redirect to dashboard if already logged in
        window.location.href = 'supplier-dashboard.html';
    }

    // Initialize form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simple email validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Disable button during "processing"
    const loginButton = document.querySelector('.login-button');
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // In a real application, this would be an actual API call
        simulateLogin(email, password)
            .then(success => {
                if (success) {
                    // Store login state
                    sessionStorage.setItem('supplierLoggedIn', 'true');
                    sessionStorage.setItem('supplierEmail', email);
                    
                    // Redirect to dashboard
                    window.location.href = 'supplier-dashboard.html';
                } else {
                    alert('Login failed. Please check your credentials and try again.');
                    loginButton.disabled = false;
                    loginButton.textContent = 'Log In';
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
                loginButton.disabled = false;
                loginButton.textContent = 'Log In';
            });
    }, 1000);
}

// Simulate login API call
function simulateLogin(email, password) {
    return new Promise((resolve) => {
        // In a real app, this would be an actual API call to your backend
        // For demo purposes, we'll accept any non-empty password with a valid email
        const isValid = email && password && validateEmail(email);
        resolve(isValid);
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Forgot password handler
function forgotPassword() {
    const email = document.getElementById('email')?.value;
    const message = email 
        ? `A password reset link will be sent to ${email} (simulated)`
        : 'Please enter your email address above to receive a password reset link';
    
    alert(message);
}

// Sign up handler
function signUp() {
    const confirmSignup = confirm('Would you like to be redirected to the supplier registration page?');
    if (confirmSignup) {
        // In a real app, this would redirect to an actual signup page
        alert('Redirecting to supplier registration (simulated)');
        // window.location.href = 'supplier-signup.html';
    }
}