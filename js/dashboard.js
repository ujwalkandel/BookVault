function showDashboard() {
    window.location.href = "dashboard.html";
}

function goToMainSite() {
    window.location.href = "index.html";
}

function switchTab(el, tabName) {
    if (el) {
        document.querySelectorAll(".dash-nav-item").forEach(a => a.classList.remove("active"));
        el.classList.add("active");
    }
    document.querySelectorAll(".dash-tab").forEach(t => t.style.display = "none");
    const target = document.getElementById("tab-" + tabName);
    if (target) target.style.display = "block";
}

function switchTabById(tabName) {
    const el = document.querySelector(`[data-tab="${tabName}"]`);
    switchTab(el, tabName);
}

function loadDashboardData() {
    const user = getCurrentUser();
    if (!user) return;

    document.getElementById("dashWelcome").textContent = "Welcome back, " + user.name.split(" ")[0] + "!";

    const activeRentals = (user.rentals || []).filter(r => r.status === "active");
    document.getElementById("statRented").textContent   = (user.rentals  || []).length;
    document.getElementById("statActive").textContent   = activeRentals.length;
    document.getElementById("statWishlist").textContent = (user.wishlist || []).length;
    document.getElementById("statDays").textContent     = daysSince(user.joinedAt);

    renderActivity(user);

    document.getElementById("profileName").value    = user.name;
    document.getElementById("profileEmail").value   = user.email;
    document.getElementById("profileJoined").value  = new Date(user.joinedAt).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
    document.getElementById("profileAvatar").textContent = user.name.charAt(0).toUpperCase();

    renderBookGrid(BOOKS);

    renderRentals(user);

    renderWishlist(user);
}

function renderActivity(user) {
    const container = document.getElementById("recentActivity");
    const activities = [
        ...(user.rentals  || []).map(r => ({ date: r.rentedAt, text: `Rented "${r.title}"`, icon: "📋" })),
        ...(user.wishlist || []).map(w => ({ date: w.addedAt,  text: `Added "${w.title}" to wishlist`, icon: "❤️" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    if (activities.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon">📖</div><p>No activity yet. Start by browsing books!</p><button class="btn btn-sm" onclick="switchTabById('browse')">Browse Books</button></div>`;
        return;
    }
    container.innerHTML = activities.map(a => `
        <div class="activity-item">
            <span class="activity-icon">${a.icon}</span>
            <span class="activity-text">${a.text}</span>
            <span class="activity-date">${new Date(a.date).toLocaleDateString()}</span>
        </div>`).join("");
}

function renderBookGrid(books) {
    const user = getCurrentUser();
    const wishlistIds = (user?.wishlist || []).map(w => w.id);
    const rentedIds   = (user?.rentals  || []).filter(r => r.status === "active").map(r => r.id);

    document.getElementById("bookGrid").innerHTML = books.map(b => {
        const wishlisted = wishlistIds.includes(b.id);
        const rented     = rentedIds.includes(b.id);
        return `
        <div class="book-card">
           <div class="book-cover">
                <img src="${b.cover}" alt="${b.title}" class="book-cover-img" />
            </div>
            <div class="book-info">
                <div class="book-genre">${b.genre}</div>
                <div class="book-title">${b.title}</div>
                <div class="book-author">by ${b.author}</div>
                <div class="book-price">$${b.price.toFixed(2)}/week</div>
                <div class="book-actions">
                    ${rented
                        ? `<button class="btn btn-sm btn-success" disabled>✓ Rented</button>`
                        : `<button class="btn btn-sm" onclick="rentBook(${b.id})">Rent</button>`
                    }
                    <button class="btn-icon ${wishlisted ? 'btn-icon-active' : ''}" onclick="toggleWishlist(${b.id})" title="Wishlist">❤️</button>
                </div>
            </div>
        </div>`;
    }).join("");
}

function filterBooks() {
    const q = document.getElementById("bookSearch").value.toLowerCase();
    const filtered = BOOKS.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
    renderBookGrid(filtered);
}

function rentBook(bookId) {
    const user = getCurrentUser();
    if (!user) return;
    const book = BOOKS.find(b => b.id === bookId);
    if (!book) return;

    const alreadyRented = (user.rentals || []).some(r => r.id === bookId && r.status === "active");
    if (alreadyRented) return showToast("You already have this book rented.", "info");

    const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    user.rentals = user.rentals || [];
    user.rentals.push({ id: bookId, title: book.title, author: book.author, cover: book.cover, price: book.price, rentedAt: new Date().toISOString(), dueDate, status: "active" });

    updateUser(user);
    loadDashboardData();
    showToast(`"${book.title}" rented! Due in 7 days.`);
}

function returnBook(bookId) {
    const user = getCurrentUser();
    if (!user) return;
    const rental = (user.rentals || []).find(r => r.id === bookId && r.status === "active");
    if (rental) {
        rental.status = "returned";
        rental.returnedAt = new Date().toISOString();
        updateUser(user);
        loadDashboardData();
        showToast("Book returned. Thanks!");
    }
}

function renderRentals(user) {
    const container = document.getElementById("rentalsList");
    const rentals = (user.rentals || []).slice().reverse();
    if (rentals.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><p>You haven't rented any books yet.</p><button class="btn btn-sm" onclick="switchTabById('browse')">Browse Books</button></div>`;
        return;
    }
    container.innerHTML = rentals.map(r => {
        const due    = new Date(r.dueDate);
        const now    = new Date();
        const overdue = r.status === "active" && due < now;
        const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
        return `
        <div class="rental-item ${overdue ? 'overdue' : ''}">
        <div class="book-cover">
                <img src="${r.cover}" alt="${r.title}" class="book-cover-img" />
            </div>
            <div class="rental-info">
                <div class="rental-title">${r.title}</div>
                <div class="rental-author">by ${r.author}</div>
                <div class="rental-dates">
                    Rented: ${new Date(r.rentedAt).toLocaleDateString()}
                    ${r.status === "active"
                        ? ` · Due: ${due.toLocaleDateString()} ${overdue ? '⚠️ Overdue' : `(${daysLeft}d left)`}`
                        : ` · Returned: ${new Date(r.returnedAt || r.dueDate).toLocaleDateString()}`
                    }
                </div>
            </div>
            <div class="rental-status">
                <span class="status-badge status-${r.status}">${r.status}</span>
                ${r.status === "active" ? `<button class="btn-sm btn-outline-sm" onclick="returnBook(${r.id})">Return</button>` : ""}
            </div>
        </div>`;
    }).join("");
}

function toggleWishlist(bookId) {
    const user = getCurrentUser();
    if (!user) return;
    const book = BOOKS.find(b => b.id === bookId);
    user.wishlist = user.wishlist || [];
    const idx = user.wishlist.findIndex(w => w.id === bookId);
    if (idx !== -1) {
        user.wishlist.splice(idx, 1);
        showToast(`Removed "${book.title}" from wishlist.`, "info");
    } else {
        user.wishlist.push({ id: bookId, title: book.title, author: book.author, cover: book.cover, addedAt: new Date().toISOString() });
        showToast(`Added "${book.title}" to wishlist. ❤️`);
    }
    updateUser(user);
    loadDashboardData();
}

function renderWishlist(user) {
    const container = document.getElementById("wishlistItems");
    const wishlist = user.wishlist || [];
    if (wishlist.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon">❤️</div><p>Your wishlist is empty.</p><button class="btn btn-sm" onclick="switchTabById('browse')">Browse Books</button></div>`;
        return;
    }
    const rentedIds = (user.rentals || []).filter(r => r.status === "active").map(r => r.id);
    container.innerHTML = wishlist.map(w => `
        <div class="book-card">
        <div class="book-cover">
                <img src="${w.cover}" alt="${w.title}" class="book-cover-img" />
            </div>
    
            <div class="book-info">
                <div class="book-title">${w.title}</div>
                <div class="book-author">by ${w.author}</div>
                <div class="book-actions">
                    ${rentedIds.includes(w.id)
                        ? `<button class="btn btn-sm btn-success" disabled>✓ Rented</button>`
                        : `<button class="btn btn-sm" onclick="rentBook(${w.id})">Rent</button>`
                    }
                    <button class="btn-icon btn-icon-active" onclick="toggleWishlist(${w.id})" title="Remove">❤️</button>
                </div>
            </div>
        </div>`).join("");
}


function saveProfile() {
    const user = getCurrentUser();
    if (!user) return;
    const newName = document.getElementById("profileName").value.trim();
    if (!newName) return showToast("Name cannot be empty.", "error");
    user.name = newName;
    updateUser(user);
    document.getElementById("userNameDisplay").textContent = newName.split(" ")[0];
    document.getElementById("userAvatar").textContent      = newName.charAt(0).toUpperCase();
    document.getElementById("dashWelcome").textContent     = "Welcome back, " + newName.split(" ")[0] + "!";
    document.getElementById("profileAvatar").textContent  = newName.charAt(0).toUpperCase();
    showToast("Profile updated!");
}

function deleteAccount() {
    if (!confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) return;
    const email = getSession();
    const users = getUsers().filter(u => u.email !== email);
    saveUsers(users);
    localStorage.removeItem("bv_session");
    document.getElementById("guestButtons").style.display = "flex";
    document.getElementById("userMenu").style.display     = "none";
    goToMainSite();
    showToast("Account deleted.", "info");
}

function logout() {
    localStorage.removeItem("bv_session");
    document.getElementById("guestButtons").style.display = "flex";
    document.getElementById("userMenu").style.display     = "none";
    goToMainSite();
    showToast("Signed out.", "info");
}
