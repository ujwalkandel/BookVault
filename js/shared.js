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

    { id: 11, title: "Moby-Dick",                  author: "Herman Melville",      genre: "Classic",  cover: "assets/moby_dick.jpg", price: 1.69 },
    { id: 12, title: "Jane Eyre",                  author: "Charlotte Brontë",     genre: "Classic",  cover: "assets/jane_eyre.jpeg", price: 1.59 },
    { id: 13, title: "Wuthering Heights",          author: "Emily Brontë",         genre: "Classic",  cover: "assets/wuthering_heights.webp", price: 1.49 },
    { id: 14, title: "War and Peace",              author: "Leo Tolstoy",          genre: "Classic",  cover: "assets/war_and_peace.jpg", price: 2.19 },
    { id: 15, title: "Anna Karenina",               author: "Leo Tolstoy",          genre: "Classic",  cover: "assets/anna_karenina.webp", price: 2.09 },
    { id: 16, title: "Crime and Punishment",       author: "Fyodor Dostoevsky",    genre: "Classic",  cover: "assets/crime_and_punishment.jpg", price: 1.89 },
    { id: 17, title: "The Catcher in the Rye",     author: "J.D. Salinger",        genre: "Classic",  cover: "assets/the_catcher_in_the_rye.jpg", price: 1.49 },
    { id: 18, title: "Little Women",               author: "Louisa May Alcott",    genre: "Classic",  cover: "assets/little_women.jpg", price: 1.39 },

    { id: 19, title: "Brave New World",            author: "Aldous Huxley",        genre: "Dystopia", cover: "assets/brave_new_world.jpg", price: 1.59 },
    { id: 20, title: "Fahrenheit 451",             author: "Ray Bradbury",         genre: "Dystopia", cover: "assets/fahrenheit.jpeg", price: 1.49 },
    { id: 21, title: "The Handmaid's Tale",        author: "Margaret Atwood",      genre: "Dystopia", cover: "assets/the_handmaid.jpg", price: 1.79 },
    { id: 22, title: "Animal Farm",                author: "George Orwell",        genre: "Dystopia", cover: "assets/animal_farm.jpg", price: 1.29 },
    { id: 23, title: "The Giver",                  author: "Lois Lowry",           genre: "Dystopia", cover: "assets/the_giver.jpg", price: 1.39 },

    { id: 24, title: "The Kite Runner",            author: "Khaled Hosseini",      genre: "Drama",    cover: "assets/the_kite_runner.jpg", price: 1.79 },
    { id: 25, title: "A Thousand Splendid Suns",   author: "Khaled Hosseini",      genre: "Drama",    cover: "assets/thousand_splendid_suns.jpg", price: 1.89 },
    { id: 26, title: "The Fault in Our Stars",     author: "John Green",           genre: "Drama",    cover: "assets/fault_in_our_stars.jpg", price: 1.49 },
    { id: 27, title: "Of Mice and Men",            author: "John Steinbeck",       genre: "Drama",    cover: "assets/mice_and_men.jpg", price: 1.29 },
    { id: 28, title: "The Book Thief",             author: "Markus Zusak",         genre: "Drama",    cover: "assets/book_thief.jpg", price: 1.69 },

    // Fiction
    { id: 29, title: "Life of Pi",                 author: "Yann Martel",          genre: "Fiction",  cover: "assets/life_of_pi.jpg", price: 1.59 },
    { id: 30, title: "The Curious Incident of the Dog in the Night-Time", author: "Mark Haddon", genre: "Fiction", cover: "assets/curious_incident.jpg", price: 1.49 },
    { id: 31, title: "Norwegian Wood",             author: "Haruki Murakami",      genre: "Fiction",  cover: "assets/norwegian_wood.jpg", price: 1.69 },
    { id: 32, title: "The Midnight Library",       author: "Matt Haig",            genre: "Fiction",  cover: "assets/midnight_library.jpg", price: 1.89 },
    { id: 33, title: "Where the Crawdads Sing",    author: "Delia Owens",          genre: "Fiction",  cover: "assets/crawdads_sing.webp", price: 1.99 },

    { id: 34, title: "Ender's Game",               author: "Orson Scott Card",     genre: "Sci-Fi",   cover: "assets/enders_game.jpg", price: 1.79 },
    { id: 35, title: "Foundation",                 author: "Isaac Asimov",         genre: "Sci-Fi",   cover: "assets/foundation.webp", price: 1.89 },
    { id: 36, title: "The Martian",                author: "Andy Weir",            genre: "Sci-Fi",   cover: "assets/martian.jpg", price: 1.99 },
    { id: 37, title: "Neuromancer",                author: "William Gibson",       genre: "Sci-Fi",   cover: "assets/neuromancer.jpg", price: 1.69 },
    { id: 38, title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", genre: "Sci-Fi", cover: "assets/electric_sheep.jpg", price: 1.59 },

    { id: 39, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy", cover: "assets/philosophers_stone.jpg", price: 2.29 },
    { id: 40, title: "A Game of Thrones",          author: "George R.R. Martin",   genre: "Fantasy",  cover: "assets/got.jpg", price: 2.39 },
    { id: 41, title: "The Name of the Wind",       author: "Patrick Rothfuss",     genre: "Fantasy",  cover: "assets/name_of_the_wind.jpeg", price: 1.99 },
    { id: 42, title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", genre: "Fantasy", cover: "assets/lion_witch_wardrobe.jpg", price: 1.49 },
    { id: 43, title: "Eragon",                     author: "Christopher Paolini",  genre: "Fantasy",  cover: "assets/eragon.jpeg", price: 1.69 },

    { id: 44, title: "Gone Girl",                  author: "Gillian Flynn",        genre: "Mystery",  cover: "assets/gone_girl.jpeg", price: 1.79 },
    { id: 45, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson",   genre: "Mystery",  cover: "assets/dragon_tattoo.jpg", price: 1.89 },
    { id: 46, title: "And Then There Were None",   author: "Agatha Christie",      genre: "Mystery",  cover: "assets/there_were_none.jpeg", price: 1.49 },
    { id: 47, title: "The Da Vinci Code",          author: "Dan Brown",            genre: "Mystery",  cover: "assets/da_vinci.jpg", price: 1.69 },

    { id: 48, title: "Educated",                   author: "Tara Westover",        genre: "Non-Fiction", cover: "assets/educated.png", price: 1.89 },
    { id: 49, title: "Atomic Habits",              author: "James Clear",          genre: "Non-Fiction", cover: "assets/atomic_habits.webp", price: 1.99 },
    { id: 50, title: "Thinking, Fast and Slow",    author: "Daniel Kahneman",      genre: "Non-Fiction", cover: "assets/fast_and_slow.jpg", price: 2.09 },
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
