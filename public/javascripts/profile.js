document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-button');
    if (!saveButton) {
        return;
    }

    saveButton.addEventListener('click', async function() {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = storedUser.user_id || storedUser.id;
        if (!userId) {
            alert('Please log in before updating your profile');
            return;
        }

        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;

        if (!email || !username) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username }),
            });

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                alert('Profile update failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating profile');
        }
    });
});
