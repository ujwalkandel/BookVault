const BOOKS = [
    { id: 1,  title: "The Great Gatsby",           author: "F. Scott Fitzgerald",  genre: "Classic",  cover: "assets/amiltoone.jpeg", price: 1.99 },
    { id: 2,  title: "1984",                       author: "George Orwell",        genre: "Dystopia", cover: "assets/1984.webp", price: 1.49 },
    { id: 3,  title: "To Kill a Mockingbird",      author: "Harper Lee",           genre: "Drama",    cover: "assets/toKillAMockingBird.jpg", price: 1.79 },
    { id: 4,  title: "The Alchemist",              author: "Paulo Coelho",         genre: "Fiction",  cover: "assets/the_alchemist.jpg", price: 1.29 },
    { id: 5,  title: "Dune",                       author: "Frank Herbert",        genre: "Sci-Fi",   cover: "assets/dune.jpg", price: 2.49 },
    { id: 6,  title: "The Hobbit",                 author: "J.R.R. Tolkien",       genre: "Fantasy",  cover: "assets/theHobbit.webp", price: 1.99 },
    { id: 7,  title: "Pride and Prejudice",        author: "Jane Austen",          genre: "Classic",  cover: "assets/PandP.jpg", price: 1.19 },
    { id: 8,  title: "The Hitchhiker's Guide",     author: "Douglas Adams",        genre: "Sci-Fi",   cover: "assets/theguide.jpg", price: 1.59 },
    { id: 9,  title: "Sherlock Holmes",            author: "Arthur Conan Doyle",   genre: "Mystery",  cover: "assets/sherlock.jpeg", price: 1.39 },
    { id: 10, title: "Sapiens",                    author: "Yuval Noah Harari",    genre: "Non-Fiction", cover: "assets/sapiens.jpg", price: 2.29 },
    
];


function hashPassword(pw) {
    return btoa(pw + "bv_salt_2026");
}

function getUsers() {
    return JSON.parse(localStorage.getItem("bv_users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("bv_users", JSON.stringify(users));
}

function getSession() {
    return localStorage.getItem("bv_session");
}

function getCurrentUser() {
    const email = getSession();
    if (!email) return null;
    return getUsers().find(u => u.email === email) || null;
}

function updateUser(updated) {
    const users = getUsers();
    const idx = users.findIndex(u => u.email === updated.email);
    if (idx !== -1) {
        users[idx] = updated;
        saveUsers(users);
    }
}

function daysSince(dateStr) {
    const ms = Date.now() - new Date(dateStr).getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24));
}


function showToast(msg, type = "success") {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.className = "toast toast-" + type;
    t.style.display = "block";
    setTimeout(() => { t.style.display = "none"; }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {

    const user = getCurrentUser();


    if (document.getElementById("mainSite") && user) {
        document.getElementById("guestButtons").style.display = "none";
        document.getElementById("userMenu").style.display = "flex";

        document.getElementById("userNameDisplay").textContent =
            user.name.split(" ")[0];

        document.getElementById("userAvatar").textContent =
            user.name.charAt(0).toUpperCase();
    }


    if (document.getElementById("dashboardPage")) {

        if (!user) {
            window.location.href = "index.html";
            return;
        }

        loadDashboardData();
    }

    document.addEventListener("click", (e) => {
        const menu = document.querySelector(".user-menu");

        if (menu && !menu.contains(e.target)) {
            menu.classList.remove("open");
        }
    });

    document.querySelector(".user-menu")?.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelector(".user-menu").classList.toggle("open");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAuth();
    });

});
