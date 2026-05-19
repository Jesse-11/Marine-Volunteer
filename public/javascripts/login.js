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

document.addEventListener('DOMContentLoaded', function() {
    const emailLoginButton = document.getElementById('email-btn');
    const emailLoginModal = document.getElementById('emailLoginModal');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    if (!emailLoginButton || !emailLoginModal || !closeModal || !loginForm) {
        return;
    }

    emailLoginButton.addEventListener('click', function() {
        emailLoginModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function() {
        emailLoginModal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == emailLoginModal) {
            emailLoginModal.style.display = 'none';
        }
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showAuthMessage('Missing login details', 'Enter both your username and password to continue.');
            return;
        }

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Failed to login');
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify(data.user));
                emailLoginModal.style.display = 'none';
                showAuthMessage('Welcome back', 'You are signed in. Redirecting to the home page.', 'success');
                window.setTimeout(() => {
                    window.location.href = '/';
                }, 700);
            })
            .catch(() => {
                showAuthMessage('Login failed', 'Check your username and password, then try again.');
            });
    });
});
