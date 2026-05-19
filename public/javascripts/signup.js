function showAuthMessage(title, message, type = 'error') {
    document.querySelectorAll('.auth-toast').forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `auth-toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
        <button type="button" aria-label="Dismiss message">&times;</button>
        <strong>${title}</strong>
        <p>${message}</p>
    `;

    toast.querySelector('button').addEventListener('click', () => toast.remove());
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), type === 'success' ? 2600 : 5200);
}

function validateSignupForm() {
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    if (username.length < 3) {
        showAuthMessage('Username is too short', 'Use at least 3 characters so other volunteers can recognise you.');
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showAuthMessage('Email needs another look', 'Enter a valid email address, for example volunteer@example.com.');
        return false;
    }

    const missingRules = [];
    if (password.length < 8) missingRules.push('8 characters');
    if (!/[0-9]/.test(password)) missingRules.push('1 number');
    if (!/[!@#$%^&*]/.test(password)) missingRules.push('1 special character');

    if (missingRules.length > 0) {
        showAuthMessage('Password is not ready yet', `Please include ${missingRules.join(', ')}.`);
        return false;
    }

    if (password !== confirmPassword) {
        showAuthMessage('Passwords do not match', 'Re-enter your password confirmation so both fields are exactly the same.');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.sign-up-form');
    if (!form) {
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validateSignupForm()) {
            return;
        }

        const formData = {
            username: document.getElementById('username').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showAuthMessage('Account created', 'Welcome to Tidekeepers Collective. Taking you to sign in now.', 'success');
                window.setTimeout(() => {
                    window.location.href = '/login';
                }, 900);
            } else {
                showAuthMessage('Could not create account', 'That username or email may already be in use. Try another one.');
            }
        } catch (error) {
            showAuthMessage('Connection problem', 'We could not reach the signup service. Please try again in a moment.');
        }
    });
});
