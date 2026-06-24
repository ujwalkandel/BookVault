function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

function handleContact(e) {
    e.preventDefault();
    showToast("Message sent! We'll get back to you soon.");
    e.target.reset();
}

function requireAuth() {
    if (getCurrentUser()) {
        showDashboard();
        setTimeout(() => switchTabById("browse"), 100);
    } else {
        openAuth("register");
    }
}