// Profile page logic for editing user info, notes, and lab

document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;
    const userKey = 'user_' + loggedInUser;
    let user = JSON.parse(localStorage.getItem(userKey));

    // Prefill profile fields
    const displayInput = document.getElementById('profile-display');
    const emailInput = document.getElementById('profile-email');
    const passwordInput = document.getElementById('profile-password');
    const profileError = document.getElementById('profile-error');
    if (displayInput) displayInput.value = user.display || '';
    if (emailInput) emailInput.value = user.email;

    // Save profile changes
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const newDisplay = displayInput.value.trim();
            const newPassword = passwordInput.value;
            if (!newDisplay) {
                profileError.textContent = 'Display name required.';
                return;
            }
            user.display = newDisplay;
            if (newPassword) user.password = newPassword;
            localStorage.setItem(userKey, JSON.stringify(user));
            profileError.textContent = '';
            alert('Profile updated!');
        });
    }

    // Stat count elements
    const notesCount = document.getElementById('notes-count');
    const labsCount = document.getElementById('labs-count');
    const achievementsCount = document.getElementById('achievements-count');

    function updateCounts() {
        // Count non-empty lines for notes and labs
        const notesLines = (notesArea.value || '').split('\n').filter(line => line.trim() !== '').length;
        const labsLines = (labArea.value || '').split('\n').filter(line => line.trim() !== '').length;
        if (notesCount) notesCount.textContent = notesLines;
        if (labsCount) labsCount.textContent = labsLines;
        if (achievementsCount) achievementsCount.textContent = user.achievements ? user.achievements.length : 0;
    }

    // Notes
    const notesArea = document.getElementById('user-notes');
    const saveNotesBtn = document.getElementById('save-notes');
    const notesStatus = document.getElementById('notes-status');
    if (notesArea) notesArea.value = user.notes || '';
    if (saveNotesBtn) {
        saveNotesBtn.addEventListener('click', function () {
            user.notes = notesArea.value;
            localStorage.setItem(userKey, JSON.stringify(user));
            notesStatus.textContent = 'Notes saved!';
            setTimeout(() => notesStatus.textContent = '', 1500);
            updateCounts();
        });
    }

    // Lab
    const labArea = document.getElementById('user-lab');
    const saveLabBtn = document.getElementById('save-lab');
    const labStatus = document.getElementById('lab-status');
    if (labArea) labArea.value = user.lab || '';
    if (saveLabBtn) {
        saveLabBtn.addEventListener('click', function () {
            user.lab = labArea.value;
            localStorage.setItem(userKey, JSON.stringify(user));
            labStatus.textContent = 'Lab notes saved!';
            setTimeout(() => labStatus.textContent = '', 1500);
            updateCounts();
        });
    }

    // Update counts on page load
    updateCounts();

    // Free Lab Modal
    const getFreeLabBtn = document.getElementById('get-free-lab');
    const freeLabModal = document.getElementById('free-lab-modal');
    const closeLabModal = document.getElementById('close-lab-modal');
    if (getFreeLabBtn && freeLabModal && closeLabModal) {
        getFreeLabBtn.addEventListener('click', function () {
            freeLabModal.style.display = 'block';
        });
        closeLabModal.addEventListener('click', function () {
            freeLabModal.style.display = 'none';
        });
        window.addEventListener('click', function (event) {
            if (event.target === freeLabModal) {
                freeLabModal.style.display = 'none';
            }
        });
    }
}); 