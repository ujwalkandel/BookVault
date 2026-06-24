function openAuth(tab = "login") {
    document.getElementById("authOverlay").style.display = "flex";
    switchAuthTab(tab);
    clearAuthErrors();
}

function closeAuth() {
    document.getElementById("authOverlay").style.display = "none";
}

function closeAuthOnBg(e) {
    if (e.target === document.getElementById("authOverlay")) closeAuth();
}

function switchAuthTab(tab) {
    const isLogin = tab === "login";
    document.getElementById("loginForm").style.display    = isLogin ? "block" : "none";
    document.getElementById("registerForm").style.display = isLogin ? "none"  : "block";
    document.getElementById("loginTab").classList.toggle("active", isLogin);
    document.getElementById("registerTab").classList.toggle("active", !isLogin);
    clearAuthErrors();
}

function clearAuthErrors() {
    ["loginError", "registerError"].forEach(id => {
        const el = document.getElementById(id);
        el.style.display = "none";
        el.textContent = "";
    });
}

function showError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.style.display = "block";
}


function handleRegister() {
    const name     = document.getElementById("regName").value.trim();
    const email    = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const confirm  = document.getElementById("regConfirm").value;

    if (!name)                          return showError("registerError", "Name is required.");
    if (!email || !email.includes("@")) return showError("registerError", "Enter a valid email.");
    if (password.length < 6)            return showError("registerError", "Password must be at least 6 characters.");
    if (password !== confirm)           return showError("registerError", "Passwords do not match.");

    const users = getUsers();
    if (users.find(u => u.email === email)) {
        return showError("registerError", "An account with this email already exists.");
    }

    const newUser = {
        email,
        name,
        password: hashPassword(password),
        joinedAt: new Date().toISOString(),
        rentals: [],
        wishlist: [],
        settings: { notifications: true, newsletter: false }
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("bv_session", email);

    closeAuth();
    onLoginSuccess();
    showToast("Welcome to BookVault, " + name.split(" ")[0] + "! 🎉");
}


function handleLogin() {
    const email    = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    if (!email)    return showError("loginError", "Email is required.");
    if (!password) return showError("loginError", "Password is required.");

    const users = getUsers();
    const user  = users.find(u => u.email === email);

    if (!user || user.password !== hashPassword(password)) {
        return showError("loginError", "Incorrect email or password.");
    }

    localStorage.setItem("bv_session", email);
    closeAuth();
    onLoginSuccess();
    showToast("Welcome back, " + user.name.split(" ")[0] + "!");
}

function logout() {
    localStorage.removeItem("bv_session");
    document.getElementById("guestButtons").style.display = "flex";
    document.getElementById("userMenu").style.display     = "none";
    goToMainSite();
    showToast("Signed out.", "info");
}

function onLoginSuccess() {
    const user = getCurrentUser();
    if (!user) return;

    // Navbar
    document.getElementById("guestButtons").style.display = "none";
    document.getElementById("userMenu").style.display     = "flex";
    document.getElementById("userNameDisplay").textContent = user.name.split(" ")[0];
    document.getElementById("userAvatar").textContent      = user.name.charAt(0).toUpperCase();

    showDashboard();
}